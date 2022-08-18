const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const fsExtra = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

const { client } = require('./modules/dbconnect.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

const { queries } = require('./modules/queries');

app.get('/users/default/default.png', (_req, res) => {
    const path = `${__dirname}/uploads/users/default/default.png`;
    res.sendFile(path);
});

app.get('/users/:id/avatar/:avatar', (req, res) => {
    const path = `${__dirname}/uploads/users/${req.params.id}/avatar/${req.params.avatar}`;
    res.sendFile(path);
});

app.get('/users/:id/publications/:name', (req, res) => {
    const path = `${__dirname}/uploads/users/${req.params.id}/publications/${req.params.name}`;
    res.sendFile(path);
});

app.get('/chats/:path', (req, res) => {
    const path = `${__dirname}/uploads/chats/${req.params.path}`;
    res.sendFile(path);
});

app.get('/chats/:chatId/files/:fileName', (req, res) => {
    const path = `${__dirname}/uploads/chats/${req.params.chatId}/files/${req.params.fileName}`;
    res.sendFile(path);
});

app.post('/changeAvatar', (req, res) => {

    const userId = req.query.userId;

    const path = `${__dirname}/uploads/users/${userId}/avatar`;

    let newAvatarPath = `/users/${userId}/avatar`;

    fsExtra.emptyDirSync(path);

    const storage = multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, path);
        },
        filename: (_req, file, cb) => {
            newAvatarPath = `${newAvatarPath}/${file.originalname}`;
            cb(null, file.originalname);
        }
    });
       
    const upload = multer({ storage: storage }).single("avatar");

    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.log("A Multer error occurred when uploading.");
            res.send("multer error");
        }
        else if (err) {
            console.log("An unknown error occurred when uploading.");
            res.send("unknown error");
        }
        else {
            const values = [newAvatarPath, userId];
            await client.query(queries.updateAvatarQuery, values);

            console.log("Everything went fine.");
            
            res.send(newAvatarPath); //returning new avatar path to update userInfo on client side
        }
    });
});

app.post('/createDirectory', (req, res) => {
    try {
        const path = `${__dirname}${req.body.path}`;

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
    }
});

app.post('/saveFilesFromMessage', (req, res) => {
    const chatId = req.query.chatId;
    const path = `${__dirname}/uploads/chats/${chatId}/files`;

    const storage = multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, path);
        },
        filename: (_req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname.replaceAll(' ', '-')}`);
        }
    });
       
    const upload = multer({ storage: storage }).array("file", 50);

    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log("A Multer error occurred when uploading.");
        }
        else if (err) {
            console.log("An unknown error occurred when uploading.");
        }
        else {
            console.log("Everything went fine.");
            res.send(req.files);
        }
    });
});

app.post('/savePublication', (req, res) => {

    const userId = req.query.userId;

    const path = `${__dirname}/uploads/users/${userId}/publications`;

    const millis = (new Date()).getMilliseconds();

    const storage = multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, path);
        },
        filename: (_req, file, cb) => {
            cb(null, `${millis}${file.originalname}`);
        }
    });
       
    const upload = multer({ storage: storage }).array("file", 50);

    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.log("A Multer error occurred when uploading.");
        }
        else if (err) {
            console.log("An unknown error occurred when uploading.");
        }
        else {
            console.log("Everything went fine.");

            const message = req.body.message;

            const publication_id = uuidv4();

            let paths = [];

            req.files.forEach((file) => {
                paths.push(`${userId}/publications/${millis}${file.originalname}`);
            });

            await client.query(queries.insertPublicationQuery, [
                publication_id, userId, message, new Date(), paths
            ]);

            res.status(200);
        }
    });
});

app.get('/publications/:publicationId', async (req, res) => {
    const publicationId = req.params.publicationId;
    const userId = req.query.userId;

    const publicationRes = await client.query(queries.selectPublicationById, [publicationId]);
    const publication = publicationRes.rows[0];

    const isLiked = await client.query(queries.selectIsLikedQuery, [userId, publication.id]);
    publication.isLiked = Boolean(Number(isLiked.rows[0].count));

    res.send(publication);
});

app.get('/publications/byUserId/:userId', async (req, res) => {
    const userId = req.params.userId;

    const publicationsRes = await client.query(queries.selectAllPublicationsById, [userId]);
    const publications = publicationsRes.rows;

    for (let i = 0; i < publications.length; i++) {
        const isLiked = await client.query(queries.selectIsLikedQuery, [userId, publications[i].id]);
        publications[i].isLiked = Boolean(Number(isLiked.rows[0].count));
    }

    res.send(publications);
});

app.get('/publications/followed/:userId', async (req, res) => {
    const userId = req.params.userId;

    const publicationsRes = await client.query(queries.selectFollowedPublications, [userId]);
    const publications = publicationsRes.rows;

    for (let i = 0; i < publications.length; i++) {
        const isLiked = await client.query(queries.selectIsLikedQuery, [userId, publications[i].id]);
        publications[i].isLiked = Boolean(Number(isLiked.rows[0].count));
    }

    res.send(publications);
});

app.post('/publications/likes', async (req, res) => {
    const { publicationId, userId, like } = req.body;

    if (like) {
        const id = uuidv4();
        await client.query(queries.likePublicationQuery1, [id, userId, publicationId]);
        await client.query(queries.likePublicationQuery2, [publicationId]);
    } else {
        await client.query(queries.removeLikeQuery1, [userId, publicationId]);
        await client.query(queries.removeLikeQuery2, [publicationId]);
    }

    res.send(200);
});

app.post('/createChat', async (req, res) => {
    const { chatId } = req.body;

    const avatarDir = `${__dirname}/uploads/chats/${chatId}/avatar`;
    const filesDir = `${__dirname}/uploads/chats/${chatId}/files`;
    fs.mkdirSync(avatarDir, { recursive: true });
    fs.mkdirSync(filesDir);

    res.send(200);
});

app.get('/chats/:chatId/files/byType/:type', async (req, res) => {
    const { chatId, type } = req.params;
    let typeForQuery = 'image';
    switch(type) {
        case 'Videos':
            typeForQuery = 'video';
            break;
        case 'Files':
            typeForQuery = 'file';
    }

    const messagesRes = await client.query(queries.getFileMessagesByType, [chatId, typeForQuery]);
    const messages = messagesRes.rows;

    let result = [];
    messages.forEach(message => {
        result.push({
            path: message.data,
            size: message.size
        });
    });

    res.send(result);
});

server.listen(5001, () => {
    console.log('App "FileService" is running on port 5001.');
});
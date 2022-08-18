const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const axios = require("axios");
const fs = require('fs');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    name: 'sid',
    secret: 'network',
    saveUninitialized: true,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2,
    }
}));

const DEFAULT_AVATAR_PATH = '/users/default/default.png';

const { v4: uuidv4 } = require('uuid');

const { client } = require('./modules/dbconnect');
const { queries } = require('./modules/queries');

app.post('/registration', async (req, res) => {

    const { nickname, password, passwordCheck, email, emailCheck } = req.body;

    try {
        const resSelect = await client.query(queries.getUserByEmailQuery, [email]);
        const resLength = resSelect.rows.length;

        if (password === passwordCheck && email === emailCheck && !resLength) {

            const id = uuidv4();

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const values = [id, nickname, email, hashedPassword, DEFAULT_AVATAR_PATH];

            await client.query(queries.insertQuery, values);

            const userDirPath = `/uploads/users/${id}`;
            const userAvatarDirPath = `/uploads/users/${id}/avatar`;
            const userPublicationsDirPath = `/uploads/users/${id}/publications`;

            await axios.post('http://localhost:5001/createDirectory', { path: userDirPath });
            await axios.post('http://localhost:5001/createDirectory', { path: userAvatarDirPath });
            await axios.post('http://localhost:5001/createDirectory', { path: userPublicationsDirPath });

            res.send('OK');
            return;
        }
    } catch (e) {
        console.log(e.stack);
    }

    res.send('ERR');
});

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const resSelect = await client.query(queries.getUserByEmailQuery, [email]);
        const passwordCheck = resSelect.rows[0].password;

        const equal = await bcrypt.compare(password, passwordCheck);

        if (equal)
        {
            req.session.userId = resSelect.rows[0].id;
            console.log(req.session.userId);
            res.send(resSelect.rows[0]);
            return;
        }
    }
    catch(e) {
        console.log(e.stack);
    }

    res.send(false);
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('OK');
});

app.post('/isAuth', async (req, res) => {

    if (req.session.userId)
    {
        const resSelect = await client.query(queries.getUserByIdQuery, [req.session.userId]);

        let user = resSelect.rows[0];
        user.friends = {};

        const resFriendsIds = await client.query(queries.selectAllFriendsIds, [req.session.userId]);
        resFriendsIds.rows.forEach(row => {
            user.friends[row.target_id] = '';
        });

        res.send(user);
        return;
    }
    res.send(false);
});

// Get user by ID
app.get('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userRes = await client.query(queries.getUserByIdQuery, [userId]);
    const user = userRes.rows[0];
    res.send(user);
});

app.get('/users', async (req, res) => {
    const phrase = req.query.phrase;

    const usersRes = await client.query(queries.selectUsersByPhrase, [`%${phrase}%`]);
    const users = usersRes.rows;

    res.send(users);
});

app.post("/follow", async (req, res) => {
    const id = uuidv4();
    const source_id = req.body.source_id;
    const target_id = req.body.target_id;
    try {
        await client.query(queries.followQuery, [id, source_id, target_id]);
        res.send();
    } catch(e) {
        console.log(e);
    }
});

app.post("/unfollow", async (req, res) => {
    const source_id = req.body.source_id;
    const target_id = req.body.target_id;
    try {
        await client.query(queries.unfollowQuery, [source_id, target_id]);
        res.send();
    } catch(e) {
        console.log(e);
    }
});

app.get('/user', async (req, res) => {

    const userId = req.query.userId;

    const userRes = await client.query(queries.getUserByIdQuery, [userId]);

    let user = userRes.rows[0];
    user.friends = {};

    const resFriendsIds = await client.query(queries.selectAllFriendsIds, [userId]);
    resFriendsIds.rows.forEach(row => {
        user.friends[row.target_id] = '';
    });

    res.send(user);
});

app.get('/users/followedBy/:sourceId', async (req, res) => {
    const sourceId = req.params.sourceId;
    const phrase = req.query.phrase;

    const usersRes = await client.query(queries.selectFollowedUsersBySourceId, [sourceId, `%${phrase}%`]);
    const users = usersRes.rows;

    res.send(users);
});

app.listen(5005, () => {
    console.log("User service is runnig on port 5005...");
});
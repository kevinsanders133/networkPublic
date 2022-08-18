const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

const { v4: uuidv4 } = require('uuid');
const { client } = require('./modules/dbconnect.js');

const { queries } = require('./modules/queries');

const users = {};

const io = require("socket.io")({ transports: ["websocket", "polling"] });
io.attach(server);

io.on('connection', function (socket) {
    socket.on('adduser', function (userId, roomId, userName) {
        socket.room = roomId;
        socket.join(socket.room);
        users[userId] = socket.id;
        console.log(users);
        console.log(socket.room + " room");
    });
    socket.on('sendmessage', function (data) {
        console.log("sendmessage");
        console.log(data.message);
        console.log('Update chat in room ' + socket.room);
        io.in(socket.room).emit('updatechat', data);
    });
    socket.on('disconnect', function (userId) {
        console.log("User left.");
        delete users[userId];
        socket.leave(socket.room);
    });
});

// Create new chat
app.post('/chats', async (req, res) => {
    const usersIds = req.body.usersIds;
    const initiatorId = req.body.initiatorId;
    const title = req.body.title;
    const type = usersIds.length === 1 ? 'private' : 'group';
    const avatar = usersIds.length === 1 ? '' : '/chats/default/default.png';
    const chatId = uuidv4();
    try {
        await axios.post('http://localhost:5001/createChat', { chatId });
        if (type === 'private') {
            const user1Res = await axios.get(`http://localhost:5005/users/${usersIds[0]}`);
            const user2Res = await axios.get(`http://localhost:5005/users/${initiatorId}`);
            const user1 = user1Res.data;
            const user2 = user2Res.data;
            // Storing users nicknames and avatars in DB (title and avatar columns) for faster loading
            // 0 position in nickname and avatar arrays represents data that would be presented for initiator (creator) of chat
            await client.query(queries.insertNewChat, [
                chatId, type, [user1.nickname, user2.nickname], [user1.avatar, user2.avatar], initiatorId
            ]);
        } else {
            await client.query(queries.insertNewChat, [chatId, type, [title], [avatar], initiatorId]);
        }
        await client.query(queries.insertNewParticipant, [uuidv4(), initiatorId, chatId]);
        for (let i = 0; i < usersIds.length; i++) {
            await client.query(queries.insertNewParticipant, [uuidv4(), usersIds[i], chatId]);
        }
    } catch(e) {
        console.log(e);
    }

    res.send(200);
});

// Get all user's chats by user's id
app.get('/chats/byUserId/:userId', async (req, res) => {
    const userId = req.params.userId;

    const chatsRes = await client.query(queries.getChatsByUserId, [userId]);
    const chats = chatsRes.rows;

    res.send(chats);
});

// Check if chat exists
app.get('/chats/private', async (req, res) => {
    const userId_1 = req.query.userId_1;
    const userId_2 = req.query.userId_2;

    const chatRes = await client.query(queries.checkIfPrivateChatExists, [userId_1, userId_2]);
    const exists = chatRes.rows.length > 0;

    res.send(exists);
});

// Get private chat info for user that sent request
app.get('/chats/private/:chatId/:userId', async (req, res) => {
    const chatId = req.params.chatId;
    const userId = req.params.userId;

    const chatRes = await client.query(queries.selectChatById, [chatId]);
    const chat = chatRes.rows[0];

    res.send(chat);
});

// Save text message in DB
app.post('/saveTextMessage', async (req, res) => {
    const chatId = req.body.chatId;
    const senderId = req.body.senderId;
    const message = req.body.message;

    await client.query(queries.saveMessage, [uuidv4(), senderId, chatId, message, 'text', new Date(), null]);

    res.sendStatus(200);
});

// Save file message in DB
app.post('/saveFileMessage', async (req, res) => {
    const chatId = req.body.chatId;
    const senderId = req.body.senderId;
    const file = req.body.file;
    const type = req.body.type;

    await client.query(queries.saveMessage, [
        uuidv4(), senderId, chatId, `/chats/${chatId}/files/${file.filename}`, type, new Date(), file.size
    ]);

    res.sendStatus(200);
});

app.get('/chats/:chatId/history', async (req, res) => {
    const chatId = req.params.chatId;

    const historyRes = await client.query(queries.getHistory, [chatId]);
    const history = historyRes.rows;
    const result = [];

    history.forEach(message => {
        let data = message.data;
        if (message.type !== 'text') {
            data = {
                path: message.data,
                size: message.size
            }
        }
        result.push({
            user_id: message.user_id,
            data: data,
            type: message.type
        });
    });

    res.send(result);
});

app.get('/chats/:chatId/lastMessage', async (req, res) => {
    const chatId = req.params.chatId;

    const messageRes = await client.query(queries.getLastMessage, [chatId]);
    const message = messageRes.rows.length === 0 ? '' : messageRes.rows[0];
    let result = message.data;

    switch(message.type) {
        case 'image':
            result = 'image';
            break;
        case 'video':
            result = 'video';
            break;
        case 'file':
            result = 'file';
    }

    res.send(result);
});

app.get('/chats/:chatId/numberOfFiles', async (req, res) => {
    const chatId = req.params.chatId;

    const messagesRes = await client.query(queries.getChatFiles, [chatId]);
    const messages = messagesRes.rows;
    const result = {images: 0, videos: 0, files: 0};

    messages.forEach(message => {
        switch(message.type) {
            case 'image':
                result.images++;
                break;
            case 'video':
                result.videos++;
                break;
            case 'file':
                result.files++;
        }
    });

    res.send(result);
});

server.listen(5000, function () {
    console.log('App "ChatService" is running on port 5000.');
});

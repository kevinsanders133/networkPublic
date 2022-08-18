const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const { client } = require('./modules/dbconnect.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

const selectCommentsByPublicationId = 'SELECT * FROM comments WHERE publication_id = $1 ORDER BY date DESC';
const insertComment = 'INSERT INTO comments VALUES ($1, $2, $3, $4, $5)';

// fetch all comments by publication id
app.get('/comments/fromPublication/:publicationId', async (req, res) => {
    const { publicationId } = req.params;
    const commentsRes = await client.query(selectCommentsByPublicationId, [publicationId]);
    const comments = commentsRes.rows;
    res.send(comments);
});

// inserting a comment
app.post('/comments', async (req, res) => {
    const payload = req.body;
    const id = uuidv4();
    const user_id = payload.user_id;
    const publication_id = payload.publication_id;
    const message = payload.message;
    const date = new Date();
    try {
        await client.query(insertComment, [
            id,
            user_id,
            publication_id,
            message,
            date
        ]);
        res.send("OK");
        return;
    } catch(e) {
        console.log(e);
    }
    res.send("ERR");
});

app.listen(5007, () => {
    console.log("Comment service is runnig on port 5007...");
});
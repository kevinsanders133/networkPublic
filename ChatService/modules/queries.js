const queries = {
    getChatsByUserId: `
        SELECT c.*
        FROM chats c
        INNER JOIN participants p
        ON c.id = p.chat_id
        WHERE p.user_id = $1
    `,
    checkIfPrivateChatExists: `
        SELECT *
        FROM chats c
        INNER JOIN participants p1
        ON c.id = p1.chat_id
        INNER JOIN participants p2
        ON c.id = p2.chat_id
        WHERE c.type = 'private'
        AND (p1.user_id = $1 AND p2.user_id = $2)
        OR (p1.user_id = $2 AND p2.user_id = $1)
    `,
    insertNewChat: 'INSERT INTO chats VALUES ($1, $2, $3, $4, $5)',
    insertNewParticipant: 'INSERT INTO participants VALUES ($1, $2, $3)',
    selectChatById: `
        SELECT *
        FROM chats
        WHERE id = $1
    `,
    saveMessage: 'INSERT INTO messages VALUES ($1, $2, $3, $4, $5, $6, $7)',
    getHistory: `
        SELECT *
        FROM messages
        WHERE chat_id = $1
        ORDER BY timestamp
    `,
    getLastMessage: `
        SELECT data, type
        FROM messages
        WHERE chat_id = $1
        ORDER BY timestamp DESC
        FETCH FIRST 1 rows only
    `,
    getChatFiles: `
        SELECT type
        FROM messages
        WHERE chat_id = $1
    `,
}

module.exports = { queries };
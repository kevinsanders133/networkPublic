const queries = {
    updateAvatarQuery: 'UPDATE users SET avatar = $1 WHERE id = $2',
    insertPublicationQuery: 'INSERT INTO publications VALUES ($1, $2, $3, $4, $5)',
    selectAllPublicationsById: 'SELECT id, message, date, paths FROM publications WHERE user_id = $1 ORDER BY date DESC',
    selectFollowedPublications: `
        SELECT p.*
        FROM publications p
        INNER JOIN followers f
        ON p.user_id = f.target_id
        WHERE f.source_id = $1
        ORDER BY p.date DESC
    `,
    selectIsLikedQuery: 'SELECT COUNT(*) FROM likes WHERE user_id = $1 AND publication_id = $2',
    selectPublicationById: 'SELECT * FROM publications WHERE id = $1',
    likePublicationQuery1: 'INSERT INTO likes VALUES ($1, $2, $3)',
    likePublicationQuery2: 'UPDATE publications SET likes = likes + 1 WHERE id = $1',
    removeLikeQuery1: 'DELETE FROM likes WHERE user_id = $1 AND publication_id = $2',
    removeLikeQuery2: 'UPDATE publications SET likes = likes - 1 WHERE id = $1',
    getFileMessagesByType: `
        SELECT *
        FROM messages
        WHERE chat_id = $1
        AND type = $2
    `,
}

module.exports = { queries }
const queries = {
    insertQuery: 'INSERT INTO users(id, nickname, email, password, avatar) VALUES($1, $2, $3, $4, $5)',
    getUserByEmailQuery: 'SELECT id, nickname, password, email, avatar FROM users WHERE email = $1',
    getUserByIdQuery: 'SELECT id, nickname, password, email, avatar FROM users WHERE id = $1',
    selectAllFriendsIds: "SELECT target_id FROM followers WHERE source_id = $1",
    selectUsersByPhrase: "SELECT * FROM users WHERE nickname ILIKE $1 ORDER BY nickname",
    followQuery: "INSERT INTO followers VALUES($1, $2, $3)",
    unfollowQuery: "DELETE FROM followers WHERE source_id = $1 AND target_id = $2",
    selectFollowedUsersBySourceId: `
        SELECT u.*
        FROM users u
        INNER JOIN followers f
        ON u.id = f.target_id
        WHERE f.source_id = $1
        AND u.nickname ILIKE $2
    `,
}

module.exports = { queries };
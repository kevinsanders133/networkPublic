const { Client } = require('pg');

const client = new Client({
    // ...
});

const connectToDB = async () => {
    try {
        await client.connect();
        console.log('DB is connected.');
    }
    catch(e) {
        console.log(e);
    }
}

connectToDB();

module.exports = { client };
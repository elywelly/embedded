import pgmock, { getPool } from 'pgmock2';
const pg = new pgmock();


const pool = getPool(pg);


export async function createUser(username, email, password) {
    const client = await pool.connect();
    const res =  await client.query('INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *', [username, email, password]);
    client.release();
    return res.rows[0]
};

export async function creatPost(user_id, link) {
    const client = await pool.connect();
    const res =  await client.query('INSERT INTO posts (user_id, link) VALUES ($1, $2) RETURNING *', [user_id, link]);
    client.release();
    return res.rows[0]
};

export default async function getUserId(username) {
    const client = await pool.connect();
    const res =  client.query('SELECT id, username FROM users WHERE username = $1', [username], {
        rowCount: 2,
        rows: [
            { id: 1, username: 'John Smith' },
            { id: 2, username: 'Rose Smith' }
        ]
    });
    client.release();
    return res.rows[0];
};


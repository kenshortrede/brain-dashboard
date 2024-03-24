import mysql from 'mysql2/promise';

// Create a pool of connections using environment variables
const pool = mysql.createPool({
    host: "127.0.0.1", //process.env.DB_HOST,
    user: "kenneth", //process.env.DB_USER,
    database: "sontiac", //process.env.DB_NAME,
    password: "k%Pmg*VEZg5wpuEP7XpcFaYzgv@rrh", //process.env.DB_PASSWORD,
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
});

export default pool;
const { Client } = require("pg");
const pgPool = require('./pool'); 
require('dotenv').config();

const SQL = `
    CREATE TABLE IF NOT EXISTS roles(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        role VARCHAR(100) UNIQUE
    );
    INSERT INTO roles (role)
    VALUES  ('user'),
            ('members'),
           ('admin');
    
    CREATE TABLE IF NOT EXISTS member_codes (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        code VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()
    );

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        forename VARCHAR(100),
        surname VARCHAR(100),
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role_id INTEGER NOT NULL DEFAULT 1,
        CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles (id)
    );

    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    date Date,
    user_id INTEGER NOT NULL,
    message VARCHAR(255),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
    );
`;

async function main() {
    console.log('sending...');
    const host = process.env.HOST || 'localhost'; //localhost
    const client = new Client({
        connectionString: `postgresql://postgres:123@${host}:5432/member_club`,
    });
    
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('all done');
}

main();

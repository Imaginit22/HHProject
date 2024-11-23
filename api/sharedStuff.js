const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const path = require('path');
const fs = require('fs/promises');
const server = express();

const { Pool } = require('pg');
const exp = require('constants');
//TODO SERVER FROM SERVER THEN WE GET REAL PARSING YAY
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
//!USE ENVIRONMENT VARIABLES
/*const pool = new Pool({
    host: 'https://6373-76-68-29-45.ngrok-free.app',
    user: 'postgres',
    database: 'postgres',
    password: 'POST',
    port: 8081,
    max: 20,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 600,
})*/
const pool = new Pool({
    database: 'hhproject',
    host: 'localhost',
    user: 'postgres',
    password: 'POST',
    max: 20,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 600,
})
/*class Pool {
    //TODO
    async query(sql, params) {
        const res = await fetch('https://6373-76-68-29-45.ngrok-free.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sql: sql, params: params })
        })
        console.log("RES", res)
        const contentType = res.headers.get('Content-Type');
        console.log(contentType, res.headers)
        let data;
        
        data = await res.json();
        console.log("STU", data, data.password)
        if (contentType && contentType.includes('application/json')) {
            
        }
        return data
    }
}
const pool = new Pool()*/
function updateIP(email, ip) {
    pool.query(`
    UPDATE sessions
    SET ip = $1
    FROM users
    WHERE users.userid = sessions.userid
    AND users.email = $2`, [ip, email])
}
function createIP(email, ip) {
    pool.query(`
    INSERT INTO sessions (userid, ip)
    SELECT userid, $1
    FROM users
    WHERE users.email = $2`, [ip, email])
}
async function forceGrab(id, idBool = false) {
    if (idBool) {
        poke(id, {p: 'y'})
    } else {
        const rowsIp = await pool.query(`
        SELECT sessions.ip 
        FROM sessions
        JOIN users
        ON users.userid = sessions.sessionuserid
        WHERE users.email = $1
        `, [id])
        ip = usId.rows[0].ip
        poke(ip, {p: 'y'})
    }
}
function poke(ip, message) {
    fetch(ip, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
    })
}
module.exports = {
    Game,
    sortHands,
    express,
    bodyParser,
    next,
    path,
    fs,
    pool,
    exp,
    splitStrings,
    checkPword,
    signin,
    updateIP,
    createIP,
    poke,
    forceGrab
}
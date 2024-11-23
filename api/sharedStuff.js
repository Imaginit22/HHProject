const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const path = require('path');
const fs = require('fs/promises');
const server = express();

require('dotenv').config()
console.log(process.env)

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
    password: process.env.password,
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
async function checkPword(username, password, correctPassword = false) {
    const useridRows = await pool.query("SELECT userid FROM users WHERE username = $1", [username])
    let userid = useridRows.rows[0].userid
    if (!userid) {
        const useridRows2 =  await pool.query("SELECT userid FROM users WHERE email = $1", [email])
        userid = useridRows2.rows[0].userid
    }
    if (correctPassword != false) {
        correctPassword = await pool.query('SELECT password FROM users WHERE userid = $1', [userid])
    }
    if (correctPassword == password) {
        return true
    } else {
        return false
    }
}
module.exports = {
    express,
    bodyParser,
    next,
    path,
    fs,
    pool,
    exp,
    checkPword
}
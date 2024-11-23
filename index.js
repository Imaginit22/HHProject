const {Game, sortHands} = require('./Game')
const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const path = require('path');
const fs = require('fs/promises');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const server = express();
const port = 3000;
const handle = app.getRequestHandler()

const { Pool } = require('pg');
const exp = require('constants');
const { splitStrings } = require('./splitstrings');
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

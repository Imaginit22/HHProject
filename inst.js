const { Pool } = require('pg');
require('dotenv').config()
console.log(process.env)
console.log("YAHOO")
//!USE ENVIRONMENT VARIABLES
const pool = new Pool({
    database: 'hhproject',
    host: 'localhost',
    user: 'postgres',
    password: process.env.password,
    max: 20,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 600,
})

const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.PORT}`); // 8626

async function makeTables() {
await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        userid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
        username TEXT UNIQUE, 
        email TEXT UNIQUE,
        password TEXT
    );

    CREATE TABLE IF NOT EXISTS orgs (
        orgid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
        orgname TEXT UNIQUE,
        ownerid INTEGER,
        FOREIGN KEY(ownerid) REFERENCES users(userid) ON DELETE CASCADE
    );
    
    CREATE TABLE IF NOT EXISTS events (
        eventid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
        hostid INTEGER, 
        whenmade TIMESTAMP, 
        latitude float8,
        longitude float8,
        name TEXT,
        description TEXT,
        address TEXT,
        FOREIGN KEY(hostid) REFERENCES orgs(orgid) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS memberships (
        membershipid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        memberid INTEGER,
        organizationid INTEGER,
        permissions INTEGER,
        UNIQUE (memberid, organizationid),
        FOREIGN KEY(memberid) REFERENCES orgs(orgid)
    );

    CREATE TABLE IF NOT EXISTS attendees (
        attendeeid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        memberid
    )
`



/*
`
    CREATE TABLE IF NOT EXISTS sessions (
        userid INTEGER,
        ip INET, 
        FOREIGN KEY(userid) REFERENCES users(userid) ON DELETE CASCADE,
        UNIQUE(userid)
    );
    CREATE OR REPLACE FUNCTION increment_invite_count()
        RETURNS TRIGGER AS $iic$
        BEGIN
            UPDATE users
            SET invite_count = invite_count + 1
            WHERE userid = NEW.senderid;
            RETURN NEW;
        END;
        $iic$ LANGUAGE plpgsql;
  
    CREATE TRIGGER increment
        AFTER INSERT ON invites FOR EACH ROW
        EXECUTE FUNCTION increment_invite_count();
    
    CREATE OR REPLACE FUNCTION decrement_invite_count()
        RETURNS TRIGGER AS $dic$
        BEGIN
            UPDATE users
            SET invite_count = invite_count - 1
            WHERE userid = OLD.senderid;
            RETURN OLD;
        END;
        $dic$ LANGUAGE plpgsql;
    
    CREATE TRIGGER decrement 
        AFTER DELETE ON invites FOR EACH ROW
        EXECUTE FUNCTION decrement_invite_count();
  `*/
  )
    console.log('MADETABLES')
  }
  makeTables();
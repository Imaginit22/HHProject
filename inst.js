const { Pool } = require('pg');

//!USE ENVIRONMENT VARIABLES
const pool = new Pool({
    database: 'hhproject',
    host: 'localhost',
    user: 'postgres',
    password: 'POST',
    max: 20,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 600,
})


async function makeTables() {
await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        userid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
        email TEXT UNIQUE, 
        password TEXT,
        organization TEXT
    );

    CREATE TABLE IF NOT EXISTS hosts (
        hostid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
        hostName TEXT UNIQUE,
        email TEXT, 
        password TEXT
    );
    
    CREATE TABLE IF NOT EXISTS events (
        eventid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
        hostid INTEGER, 
        whenmade TIMESTAMP, 
        FOREIGN KEY(hostid) REFERENCES hosts(hostid) ON DELETE CASCADE, 
    );

    CREATE TABLE IF NOT EXISTS memberships (
        membershipid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        memberid INTEGER,
        organizationid INTEGER,
        UNIQUE (memberid, organizationid),
        FOREIGN KEY(memberid) REFERENCES hosts(userid)
    );






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
  `
  )
    console.log('MADETABLES')
  }
  makeTables();
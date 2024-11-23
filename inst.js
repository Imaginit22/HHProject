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
    invite_count INTEGER DEFAULT 0
  );
  
  CREATE TABLE IF NOT EXISTS invites (
    inviteid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    senderid INTEGER, 
    recipientid INTEGER, 
    whenmade TIMESTAMP, 
    UNIQUE(senderid, recipientid), 
    FOREIGN KEY(senderid) REFERENCES users(userid) ON DELETE CASCADE, 
    FOREIGN KEY(recipientid) REFERENCES users(userid) ON DELETE CASCADE
  );
  
  CREATE TABLE IF NOT EXISTS games (
    gameid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    senderid INTEGER,
    recipientid INTEGER, 
    gamePhase INTEGER, 
    gamedata TEXT,
    p1pts INTEGER,
    p2pts INTEGER, 
    FOREIGN KEY(senderid) REFERENCES users(userid) ON DELETE CASCADE, 
    FOREIGN KEY(recipientid) REFERENCES users(userid) ON DELETE CASCADE, 
    UNIQUE(senderid, recipientid)
  );

  CREATE TABLE IF NOT EXISTS wins (
    winid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    winnerid INTEGER,
    loserid INTEGER,
    count INTEGER,
    FOREIGN KEY(winnerid) REFERENCES users(userid) ON DELETE CASCADE, 
    FOREIGN KEY(loserid) REFERENCES users(userid) ON DELETE CASCADE,
    UNIQUE(winnerid, loserid)
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
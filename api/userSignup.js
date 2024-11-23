const {pool, checkPword} = require('./sharedStuff')
const api = async (req, res) => {
    const insert = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email.toLowerCase(), password]);
    console.log("INSERT USERSIGNUP", insert)
    res.status(250).json({
        message: ""
    })
}
module.exports = api
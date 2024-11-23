const {pool, checkPword} = require('./sharedStuff')
const userSignup = async (req, res) => {
    body = req.body
    const insert = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [body.email.toLowerCase(), body.password]);
    console.log("INSERT USERSIGNUP", insert)
    res.status(250).json({
        message: "You signed up!"
    })
}
module.exports = userSignup
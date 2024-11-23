const {pool, checkPword} = require('./sharedStuff')
const userLogin = async (req, res) => {
    const body = req.body
    if (checkPword(body.username, body.password) || checkPword(body.email, body.password)) {
        console.log("USERLOGGEDIN")
        usernameRows = await pool.query("SELECT username FROM users WHERE password = $1", [body.password])
        res.status(250).json({
            message: 'Logged in!',
            username: usernameRows.rows[0].username
        })
    } else {
        res.status(400).json({
            message: "Wrong password. Try again."
        })
    }
}
module.exports = userLogin
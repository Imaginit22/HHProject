const {pool, checkPword} = require('./sharedStuff')
const userLogin = async (req, res) => {
    const body = req.body
    if (checkPword(body.username, body.password)) {
        console.log("USERLOGGEDIN")
        res.status(250).json({
            message: 'Logged in!'
        })
    } else {
        res.status(400).json({
            message: "Wrong password. Try again."
        })
    }
}
module.exports = userLogin
const {pool, checkPword} = require('./sharedStuff')
const userLogin = async (req, res) => {
    const body = req.body
    if (checkPword(body.username, body.password)) {
        print("USERLOGGEDIN")
    } else {
        res.status.json({
            message: "Wrong password. Try again."
        })
    }
}
module.exports = userLogin
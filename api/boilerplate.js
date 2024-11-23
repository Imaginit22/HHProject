const {pool, checkPword} = require('./sharedStuff')
const api = async (req, res) => {
    const body = req.body
    if (checkPword(body.username, body.password)) {
        
    }
}
module.exports = api
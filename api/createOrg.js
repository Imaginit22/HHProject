const {pool, checkPword} = require('./sharedStuff')
const createOrg = async (req, res) => {
    const body = req.body
    if (checkPword(body.username, body.password)) {
        
    }
}
module.exports = createOrg
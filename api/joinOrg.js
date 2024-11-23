const {pool, checkPword} = require('./sharedStuff')
const joinOrg = async (req, res) => {
    const body = req.body
    console.log("JOIN ORG BODY", body)
    if (checkPword(body.username, body.password)) {
        pool.query("INSERT INTO memberships (orgname) VALUES ($1)", [body.orgname])
    }
}
module.exports = joinOrg
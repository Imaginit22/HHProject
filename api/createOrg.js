const {pool, checkPword} = require('./sharedStuff')
const createOrg = async (req, res) => {
    const body = req.body
    console.log("CREATE ORG BODY", body)
    if (checkPword(body.username, body.password)) {
        pool.query("INSERT INTO orgs (orgname) VALUES ($1)", [body.orgname])
        pool.query("INSERT INTO memberships (")
    }
}
module.exports = createOrg
const {pool, checkPword} = require('./sharedStuff')
const createOrg = async (req, res) => {
    const body = req.body
    console.log("CREATE ORG BODY", body)
    if (checkPword(body.username, body.password)) {
        await pool.query("INSERT INTO orgs (orgname) VALUES ($1)", [body.orgname])
        const useridRow = await pool.query("SELECT userid FROM users WHERE password = $1", [body.password])
        const userid = useridRow.rows[0].userid
        const orgidRow = await pool.query("SELECT orgid FROM orgs WHERE orgname = $1", [body.orgname])
        const orgid = orgidRow.rows[0].orgid
        console.log([userid, orgid, 0])
        await pool.query("INSERT INTO memberships (memberid, organizationid, permissions) VALUES ($1, $2, $3)", [userid, orgid, 0])
    }
}
module.exports = createOrg
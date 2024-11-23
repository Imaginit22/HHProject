const vendorSignup = async (req, res) => {
    try {
      console.log("Submit")
      console.log(req.connection.remotePort)
      const password = req.body.password;
      const email = req.body.email;
      console.log(email, password);
      console.log("DONE CREATING-----------------------------------");
      console.log(email.toLowerCase());
      const rowPassword = await pool.query("SELECT password FROM users WHERE email = $1", [email.toLowerCase()]);
      console.log("THISISPASSROW: ", rowPassword)
      if (rowPassword.rowCount == 0) {
        console.log(email, password, " EMAILPASSWORD")
        await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email.toLowerCase(), password]);
        createIP(email, req.ip)
        res.status(250).json({
          message: 'GOToGO'
        })
      } else {
        console.log("PASSWORD EXISTS", rowPassword.rows[0], password)
        if (password == rowPassword.rows[0].password) {
          updateIP(email, req.ip)
          res.status(250).json({
            message: 'GOToGO'
          })
        } else {
          res.status(400).json({
            error: 'Duplicate email',
            message: 'That email address is already in use. Please use a different password.'
          });
        }
      }
    } catch (error) {
      console.log(error)
    }
}
module.exports = vendorSignup
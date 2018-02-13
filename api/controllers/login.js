var auth = require("../helpers/auth");
var Model = require('../../api/models/user');

exports.loginPost = (req, res, next) => {
  var role = req.swagger.params.role.value;
  var correo = req.body.correo;
  var password = req.body.password;

  Model.findOne({ 'correo': correo, 'password': password, 'role': role }, (err, user) => {
    if (err) return res.status(404).json({ message: "Error" });
    if (user) {
      var tokenString = auth.issueToken(correo, role);
      var response = { token: tokenString };
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    } else {
      var response = { message: "Error: Credentials incorrect" };
      res.writeHead(403, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    }
  });
};
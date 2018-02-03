var auth = require("../helpers/auth");

module.exports = {
    loginPost: loginPost
};

function loginPost(req, res, next){
    var role = req.swagger.params.role.value;
    var username = req.body.correo;
    var password = req.body.password;
  
    if (role != "user" && role != "admin" && role != "israel") {
      var response = { message: 'Error: Role must be either "admin" or "user"' };
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    }
  
    if (username == "username" && password == "password" && role) {
      var tokenString = auth.issueToken(username, role);
      var response = { token: tokenString };
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    } else {
      var response = { message: "Error: Credentials incorrect" };
      res.writeHead(403, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    }
  };
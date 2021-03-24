const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/users/me", 
    [authJwt.verifyToken],
    controller.employeeBoard
  );

  app.get("/users/all", 
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allAccess
  );

  app.get(
    "/users/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post("/users/me/logout",
    [authJwt.verifyToken],
    controller.startPage
  );
};
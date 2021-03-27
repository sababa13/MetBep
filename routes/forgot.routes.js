const controller = require("../controllers/forgot.controller");

module.exports = function(app) {
    app.use(function(res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post("/users/forgot-password", controller.forgotPassword);
    
    app.post('/users/reset-password/:token', controller.resetPassword);
};
const controller = require("../controllers/completeQuestionnaire.controller");
const verifyPatient = require("../middlewares/verifyPatient");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/users/me/questionnaire", 
    [
      verifyPatient.verifyIfPatientAlreadyExists,
      verifyPatient.checkRolePatientExisted
    ],
    controller.completeQuestionnaire
  );

  app.get(
    "/users/me/all-patient-data/:idnp", 
    controller.getDataAboutPatient
  );

  app.get(
    "/users/me/all-questionnaires/:idnp",
    controller.getAllPatientQuestionnaires
  )

  app.get(
    "/users/me/all-registered-patients",
    controller.getRegisteredPatients
  )
}
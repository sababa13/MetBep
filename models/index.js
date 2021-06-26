const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.employee = require("./employee");
db.role = require("./role");
db.patient = require("./patient");
db.ROLES = ["employee", "admin", "patient"];
db.patientQuestionnaire = require("./patientQuestionnaire");

module.exports = db;
const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.employee = require("./employee");
db.role = require("./role");
db.ROLES = ["employee", "admin"];

module.exports = db;
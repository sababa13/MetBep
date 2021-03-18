var Schema = mongoose.Schema;

var employeeSchema = new Schema(
  {
    _id: {type: Number, required: true},
    first_name: {type: String, required: true, maxlength: 100},
    last_name: {type: String, required: true, maxlength: 100},
    user_name: {type: String, required: true, maxlength: 100},
    password: {type: String, required: true, minlength:8, maxlength: 20},
    email: {type: String, required: true, maxlength: 100},
    mobile: {type: Number},
    phone: {type: Number},
  }
);

// Virtual for employee's full name
employeeSchema
.virtual('name')
.get(function () {
  return this.last_name + ', ' + this.first_name;
});

// Virtual for employee's mobile number
employeeSchema
.virtual('mobile')
.get(function () {
  return (this.mobile).toString();
});

// Virtual for employee's URL
employeeSchema
.virtual('url')
.get(function () {
  return '/models/employee/' + this._id;
});

//Export model
module.exports = mongoose.model('Employee', employeeSchema);

// var mongoose = require('mongoose'),
// 	Schema = mongoose.Schema;

// var employeeSchema = new mongoose.Schema({
// 	_id: Number,
// 	first_name: String,
//     last_name: String,
//     user_name: String,
//     password: String,
//     email: String,
//     mobile: Number,
//     phone: Number
// });

// exports.def =  
// 	{
// 		"Employee":{
// 			"_id":"Employee",
// 			"required": ["_id", "first_name", "last_name", "user_name", "password", "email", "mobile", "phone"],
// 			"properties":{
// 				"_id":{
// 					"type":"integer",
// 					"format": "int64",
// 					"description": "An unique identifier",
// 					"minimum": "0.0",
// 					"maximum": "1000000.0"
// 				},
// 				"first_name":{
// 					"type":"string",
// 					"description": "A given name or forename"
// 				},
//                 "last_name":{
//                     "type":"string",
// 					"description": "A surname of family name"
//                 },
//                 "user_name":{
//                     "type":"string",
// 					"description": "A unique identifier"
//                 },
//                 "password":{
//                     "type":"string",
//                     "description": "Should contain at least 9 characters, at least 1 uppercase letter, at least 1 lowercase letter and at least 1 numerical character"
//                 },
//                 "email":{
//                     "type":"string"
//                 },
//                 "mobile":{
//                     "type":"integer",
// 					"format": "int64",
// 					"description": "Employee's private mobile number",
// 					"minimum": "0.0",
// 					"maximum": "20.0"
//                 },
//                 "phone":{
//                     "type":"integer",
// 					"format": "int64",
// 					"description": "Employee's private phone number",
// 					"minimum": "0.0",
// 					"maximum": "20.0"
//                 }
// 			}
// 		}
// 	};

// // Virtual for bookinstance's URL
// employeeSchema
// .virtual('url')
// .get(function () {
//   return 'd:/data/db/employee/' + this._id;
// });

// exports.model = mongoose.model('employees', employeeSchema);
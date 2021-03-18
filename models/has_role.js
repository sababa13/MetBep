var Schema = mongoose.Schema;

var has_roleSchema = new Schema(
  {
	_id: {type: Number, required: true},
	employee_id: {type: Number, required: true, maxlength: 100},
    role_id: {type: Number, required: true, maxlength: 100},
  }
);

//Export model
module.exports = mongoose.model('has_role', has_roleSchema);

// var mongoose = require('mongoose'),
// 	Schema = mongoose.Schema;

// var roleSchema = new mongoose.Schema({
// 	_id: Number,
// 	employee_id: Number,
//     role_id: Number
// });

// exports.def =  
// 	{
// 		"Role":{
// 			"_id":"Role",
// 			"required": ["_id", "role_name",],
// 			"properties":{
// 				"_id":{
// 					"type":"integer",
// 					"format": "int64",
// 					"description": "An unique identifier",
// 					"minimum": "0.0",
// 					"maximum": "1000000.0"
// 				},
// 				"employee_id":{
// 					"type":"integer",
// 					"format": "int64",
// 					"description": "Employee's unique identifier",
//                     "minimum": "0.0",
// 					"maximum": "1000000.0"
// 				},
//                 "role_id":{
//                     "type":"integer",
// 					"format": "int64",
// 					"description": "Role's unique identifier",
//                     "minimum": "0.0",
// 					"maximum": "1000000.0"
//                 }
// 			}
// 		}
// 	};

// exports.model = mongoose.model('roles', roleSchema);
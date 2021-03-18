var Schema = mongoose.Schema;

var roleSchema = new Schema(
  {
	_id: {type: Number, required: true},
    role_name: {type: String, required: true, maxlength: 100},
  }
);

//Export model
module.exports = mongoose.model('Role', roleSchema);

// var mongoose = require('mongoose'),
// 	Schema = mongoose.Schema;

// var roleSchema = new mongoose.Schema({
// 	_id: Number,
// 	role_name: String
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
// 				"role_name":{
// 					"type":"string",
// 					"description": "Hospital staff roles"
// 				}
// 			}
// 		}
// 	};

// exports.model = mongoose.model('roles', roleSchema);
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
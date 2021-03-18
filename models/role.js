var Schema = mongoose.Schema;

var roleSchema = new Schema(
  {
	_id: {type: Number, required: true},
    role_name: {type: String, required: true, maxlength: 100},
  }
);

//Export model
module.exports = mongoose.model('Role', roleSchema);
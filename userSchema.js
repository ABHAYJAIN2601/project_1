const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({

	username:{
		type:String,
		index: {
			unique: true
		},
	},
	avatar:{
		type:Number
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

var userModel = mongoose.model('users', userSchema);
module.exports = userModel;
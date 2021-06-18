const mongoose = require('mongoose');
var VideoSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId ,ref:"users"
    },
	videoUrl:{
		type:String
	},
	headline:{
		type:String
	},
	description:{
		type:String
	},
	likes:[],
	views:{
		type:Number,
		default:0
	},
	comments:[
		{
			user_id:{
				type:mongoose.Schema.Types.ObjectId ,ref:"users"
			},
			comment:{
				type:String
			},
			avatar:{
				type:Number
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

var videoModel = mongoose.model('videos', VideoSchema);
module.exports = videoModel;
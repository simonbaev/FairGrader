/* jshint esnext: true */
const mongoose = require('mongoose');
const uuid = require('uuid');

tokenSchema = mongoose.Schema({
	uuid: String,
	cteatedAt: {
		type: Date,
		default: Date.now,
		expires: '1d'
	},
	used: {
		type: Boolean,
		default: false
	},
	target: {
		id: mongoose.Schema.ObjectId,
		view : {
			/* Corresponding template file must exist in views directory */
			type : String,
			enum: [
				'passwordSetup',
			]
		}
	}
})
.pre('save', function(next){
	if(!this.uuid) {
		this.uuid = uuid.v4();
	}
	next();
})
.index({
	uuid: 1
});

module.exports = mongoose.model('Token', tokenSchema);
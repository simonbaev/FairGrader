/* jshint esnext: true */
const mongoose = require('mongoose');
const uuid = require('node-uuid');

tokenSchema = mongoose.Schema({
	uuid: String,
	cteatedAt: {
		type: Date,
		default: Date.now,
		expires: 600
	},
	used: {
		type: Boolean,
		default: false
	},
	target: {
		id: mongoose.Schema.ObjectId,
		type : {
			type : String,
			enum: [
				'passwordRestore',
				'contributionAcceptance'
			]
		}
	}
})
.pre('save', function(next){
	this.uuid = uuid.v4();
	next();
});

module.exports = mongoose.model('Token', tokenSchema);
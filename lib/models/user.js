var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

userSchema = mongoose.Schema({
	name: String,
	email: {
		type: String,
		required: true
	},
	pass: {
		type: String,
		required: true
	},
	faculty: {
		type: Boolean,
		default: false
	},
	confirmed: {
		type: Boolean,
		default: false
	}
})
.pre('save', function(next){
	var $this = this;
	if($this.pass.indexOf("$2a$12$") === 0 && $this.pass.split(/\$/)[3].length == 53) {
		//-- password already hashed, no need to re-hash it
		return next();
	}
	bcrypt.hash($this.pass, 12, function(err, hash) {
		if(err) {
			return next(err);
		}
		$this.pass = hash;
		next();
	});
})
.method('checkPassword',function(pass, fn){
	var $this = this;
	bcrypt.compare(pass, $this.pass, function(err, res) {
		if(err){
			return fn(err);
		}
		fn(null,res);
	});
});

module.exports = mongoose.model('User', userSchema);

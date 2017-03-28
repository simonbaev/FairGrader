var Token = require('../models/token');

exports.setup = function(next) {
	Token.remove({},function(err){
		if(err) {
			return next(err);
		}
		next(null, 'Tokens removed');
	});
};
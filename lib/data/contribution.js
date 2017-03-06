var Contribution = require('../models/contribution');

exports.setup = function(next) {
	Contribution.remove({},function(err){
		if(err) {
			return next(err);
		}
		next(null,[]);
	});
};
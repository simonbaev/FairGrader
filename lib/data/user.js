var User = require('../models/user');

exports.setup = function(next) {
	User.remove({},function(err){
		if(err) {
			return next(err);
		}
		var users = [
			{
				name: "Baev, Simon S.",
				email: "simon.baev@gsw.edu",
				faculty: true,
				pass: "Fireball@1971"
			},
			{
				name: "Anderson, Alejandra R.",
				email: "aander12@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Anderson, Ryan A.",
				email: "randers6@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Brown, Benjamin M.",
				email: "bbrown40@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Deal, Jonathan D.",
				email: "jdeal1@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Exum, Haley E.",
				email: "hexum@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Helms, Madison K.",
				email: "mhelms3@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Hobbs, Jonathan R.",
				email: "jhobbs2@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Hubbard, Wordie R.",
				email: "whubbar1@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Jordan, Sabrina R.",
				email: "sjones59@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Kelly, Jason T.",
				email: "jkelly11@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Landers, Curtis J.",
				email: "clander1@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Martinez, Oscar R.",
				email: "omartine@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Redmond, Chase T.",
				email: "credmon1@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Reed, Leonard L.",
				email: "lreed1@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Robinson, Dashumon R.",
				email: "drobins6@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Sloan, Parker G.",
				email: "psloan@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Stewart, Braxston C.",
				email: "bstewar3@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Swan, Thomas C.",
				email: "tswan@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Trinh, Joseph N.",
				email: "jtrinh@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Tripi, Vincent J.",
				email: "vtripi@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Fan, Kai",
				email: "kfan@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Gangji, Aslam F.",
				email: "agangji@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Hong, Hyukpyo",
				email: "hhong@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Marshall, Barry K.",
				email: "bmarsha4@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Powell, Michael G.",
				email: "mpowel15@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Reddivari, Kalyan R.",
				email: "kreddiva@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Shah, Asit A.",
				email: "ashah1@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Singh, Preeti",
				email: "psingh@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Smith, Robert",
				email: "rsmith36@radar.gsw.edu",
				pass: "abc123"
			},
			{
				name: "Thoseby, Adam",
				email: "athoseby@radar.gsw.edu",
				pass: "abc123"
			},

		]
		.forEach(function(entry,index,array){
			entry.confirmed = true;
			new User(entry).save(function(err,user){
				if (err) {
					return next(err);
				}
				if(index == (array.length-1)) {
					next(null, array);
				}
			});
		});
	});
};
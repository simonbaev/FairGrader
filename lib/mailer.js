var nodemailer = require('nodemailer');

var smtpConfig = {
	host: 'fg.gswcm.net',
	port: 25,
	logger: false,
	secure: false,
	ignoreTLS: true
};

var defaultMailingOptions = {
	from: 'noreply@fg.gswcm.net',
	replyTo: 'noreply@fg.gswcm.net'
};

exports.transporter = nodemailer.createTransport(smtpConfig, defaultMailingOptions);


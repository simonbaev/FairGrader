var nodemailer = require('nodemailer');

var smtpConfig = {
	host: 'fg.gswcm.net',
	port: 25,
	logger: require('bunyan').createLogger({
		name: "FairGrader",
		streams: [
			{
				type: 'rotating-file',
				level: 'info',
				path: 'logs/mailer.log',
				period: '1d', // daily rotation
				count: 3 // keep 3 back copies
			},
			{
				stream: process.stderr,
				level: 'warn'
			}
		]
	}),
	secure: false,
	ignoreTLS: true,
	connectionTimeout: 2000
};

var defaultMailingOptions = {
	from: 'noreply@fg.gswcm.net',
	replyTo: 'noreply@fg.gswcm.net'
};

exports.transporter = nodemailer.createTransport(smtpConfig, defaultMailingOptions);

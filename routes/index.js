/* jshint esnext: true */

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	res.redirect('/reports');
});

module.exports = router;
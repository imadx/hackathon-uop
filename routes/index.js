var express = require('express');
var sha256 = require('sha256');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hackathon 2016' });
});
router.post('/', function(req, res, next) {
	console.log(sha256('hackathon16'));
	var match = "" + sha256(req.body.password);
	if(match == ("e55b12c79c08680f78fb15b488f89e456267ea34975b781fc88d3472ea4d3308"))
  	res.render('scorecard');
	else if(match == ("f862c2939137d450c9f577b9140e63413ecfde856f0fbb0d1dba387fe3557613"))
  	res.render('scorecard_viewer', { title: 'Hackathon 2016' });
  else
  	res.send('Access unauthorized');

});

module.exports = router;

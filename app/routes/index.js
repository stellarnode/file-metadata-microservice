'use strict';

var fs = require("fs");
var path = process.cwd();
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path + '/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname)
  }
});

var upload = multer({ storage: storage });

var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');


module.exports = function (app, passport) {

	// function isLoggedIn (req, res, next) {
	// 	if (req.isAuthenticated()) {
	// 		return next();
	// 	} else {
	// 		res.redirect('/login');
	// 	}
	// }

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		

	app.route('/uploads/')
		.post(upload.single("file"), function(req, res) {
			console.log("file size: ", req.file.size);
			var out = {
				"fileName": req.file.originalname,
				"fileSizeInBytes": req.file.size
			};
			res.json(out);
			
			// The following deletes uploaded files //
			
			fs.readdir(path + "/uploads/", function(err, files) {
				if (err) console.log(err);
				files.forEach(function(file) {
					fs.unlink(path + "/uploads/" + file, function(err) {
						if (err) console.log(err);
					});
				});
			});
		});
		
//////////////////////////////////////////////////////////		

	// app.route('/login')
	// 	.get(function (req, res) {
	// 		res.sendFile(path + '/public/login.html');
	// 	});

	// app.route('/logout')
	// 	.get(function (req, res) {
	// 		req.logout();
	// 		res.redirect('/login');
	// 	});

	// app.route('/profile')
	// 	.get(isLoggedIn, function (req, res) {
	// 		res.sendFile(path + '/public/profile.html');
	// 	});

	// app.route('/api/:id')
	// 	.get(isLoggedIn, function (req, res) {
	// 		res.json(req.user.github);
	// 	});

	// app.route('/auth/github')
	// 	.get(passport.authenticate('github'));

	// app.route('/auth/github/callback')
	// 	.get(passport.authenticate('github', {
	// 		successRedirect: '/',
	// 		failureRedirect: '/login'
	// 	}));

	// app.route('/api/:id/clicks')
	// 	.get(isLoggedIn, clickHandler.getClicks)
	// 	.post(isLoggedIn, clickHandler.addClick)
	// 	.delete(isLoggedIn, clickHandler.resetClicks);
};

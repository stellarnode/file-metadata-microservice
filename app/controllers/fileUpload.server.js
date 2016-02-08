'use strict';

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

var upload = multer({ storage: storage }).any();


function uploadFile(req, res, next) {
    upload(req, res, function(request, response) {
        console.log("file object: ", request.file);
        // next(request, response);
    });
}


module.exports = uploadFile;
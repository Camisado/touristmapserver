var querystring = require("querystring");
var urlstring = require("url");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://camisado:test@ds053090.mongolab.com:53090/heroku_app31942135';
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'hwsoctyfi',
    api_key: '562213589338915',
    api_secret: 'RHjiL085z4b_nzlU0VtDSp1rAuY'
});

var fs = require("fs");
var formidable = require('formidable');

function start(response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
    /*MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("start");
        var collection = db.collection('test');
        collection.find({}, {"_id": 0}).toArray(function(err, docs) {
            var test = JSON.stringify(docs);
            console.log(test);
            db.close();
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(test);
            response.end();
        });
    });*/
}

function add(response) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('test');
        var doc1 = {'hello':'doc1'};
        collection.insert(doc1, function(err, result) {
            db.close();
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(JSON.stringify(doc1));
            response.end();
        });
    });
}

function find(response, request) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('test');
        collection.find(querystring.parse(urlstring.parse(request.url).query), {"_id": 0}).toArray(function(err, docs) {
            var test = JSON.stringify(docs);
            console.log(test);
            db.close();
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(test);
            console.log(querystring.parse(urlstring.parse(request.url).query));
            response.end();
        });
    });
}

function upload(response, request) {
//    /*cloudinary.uploader.upload("d:\\phonegap\\GoogleMapsAPIV3\\www\\img\\logo.png", function(result) {
//        console.log(result);
//        response.writeHead(200, {"Content-Type": "text/html"});
//        var body = '<html>'+
//            '<head>'+
//            '<meta http-equiv="Content-Type" '+
//            'content="text/html; charset=UTF-8" />'+
//            '</head>'+
//            '<body>'+
//            '<img src="'+result.url+'" alt="my img" />' +
//            '</body>'+
//            '</html>';
//        response.write(body);
//        //console.log(querystring.parse(postData.query));
//        response.end();
//    });*/
//    console.log("Request handler 'upload' was called.");
//    if (request.method == 'POST') {
//        console.log("request post");
//        var jsonString = '';
//        request.on('data', function (data) {
//            jsonString += data;
//        });
//        request.on('end', function () {
//            console.log(jsonString);
//            cloudinary.uploader.upload(jsonString, function(result) {
//                console.log(result);
//                response.writeHead(200, {"Content-Type": "text/html"});
//                var body = '<html>'+
//                    '<head>'+
//                    '<meta http-equiv="Content-Type" '+
//                    'content="text/html; charset=UTF-8" />'+
//                    '</head>'+
//                    '<body>'+
//                    '<img src="'+result.url+'" alt="my img" />' +
//                    '</body>'+
//                    '</html>';
//                response.write(body);
//                //console.log(querystring.parse(postData.query));
//                response.end();
//        });
//    });
//    }

    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        /*response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(files));
        response.end();*/
        //logs the file information
        console.log(JSON.stringify(files));
        cloudinary.uploader.upload(files.file.path, function(result) {
            console.log(JSON.stringify(result));
            response.writeHead(200, {"Content-Type": "text/html"});
            var body = '<html>'+
                '<head>'+
                '<meta http-equiv="Content-Type" '+
                'content="text/html; charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                '<img src="'+result.url+'" alt="my img" />' +
                '</body>'+
                '</html>';
            response.write(body);
            response.end();
        });

        /*fs.rename(files.file.path, "/tmp/test.png", function(err) {
            if (err) {
                fs.unlink("/tmp/test.png");
                fs.rename(files.file.path, "/tmp/test.png");
            }
        });*/

        /*if (files.upload) {
            console.log(files.upload.path);
            cloudinary.uploader.upload(files.upload.path, function (result) {
                console.log(result);
                response.writeHead(200, {"Content-Type": "text/html"});
                var body = '<html>' +
                    '<head>' +
                    '<meta http-equiv="Content-Type" ' +
                    'content="text/html; charset=UTF-8" />' +
                    '</head>' +
                    '<body>' +
                    'Image uploaded to server' +
                    '</body>' +
                    '</html>';
                response.write(body);
                //console.log(querystring.parse(postData.query));
                response.end();
            });
        } else {
            response.writeHead(200, {"Content-Type": "text/html"});
            var body = '<html>' +
                '<head>' +
                '<meta http-equiv="Content-Type" ' +
                'content="text/html; charset=UTF-8" />' +
                '</head>' +
                '<body>' +
                'No image' +
                '</body>' +
                '</html>';
            response.write(body);
            response.end();
        }*/
    });

    /*var form = new formidable.IncomingForm();
    console.log(form);
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        if (files.upload) {
            console.log(files.upload.path);
            cloudinary.uploader.upload(files.upload.path, function (result) {
                console.log(result);
                response.writeHead(200, {"Content-Type": "text/html"});
                var body = '<html>' +
                    '<head>' +
                    '<meta http-equiv="Content-Type" ' +
                    'content="text/html; charset=UTF-8" />' +
                    '</head>' +
                    '<body>' +
                    '<img src="' + result.url + '" alt="my img" />' +
                    '</body>' +
                    '</html>';
                response.write(body);
                //console.log(querystring.parse(postData.query));
                response.end();
            });
        } else {
            response.writeHead(200, {"Content-Type": "text/html"});
            var body = '<html>' +
                '<head>' +
                '<meta http-equiv="Content-Type" ' +
                'content="text/html; charset=UTF-8" />' +
                '</head>' +
                '<body>' +
                'No image' +
                '</body>' +
                '</html>';
            response.write(body);
            response.end();
        }
    });*/
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("d:\\phonegap\\GoogleMapsAPIV3\\www\\img\\logo.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.add = add;
exports.find = find;
exports.upload = upload;
exports.show = show;
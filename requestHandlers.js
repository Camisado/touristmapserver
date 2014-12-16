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
        '<h1>Server commands:</h1>'+
        '<li><a href="/start">Start</a></li>'+
        '<li><a href="/list">List</a></li>'+
        '<li><a href="/find">Find</a></li>'+
        '<li><a href="/add">Add</a></li>'+
        '<li><a href="/upload">Upload</a></li>'+
        '<ul>'+
        '</ul>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function add(response, request) {
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields) {
        console.log("fields: " + fields.info);
        if(request.method === 'POST') {
            MongoClient.connect(url, function (err, db) {
                assert.equal(null, err);
                var collection = db.collection('place');
                var place = fields;
                collection.insert(place, function (err, result) {
                    db.close();
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.write(JSON.stringify(result.ops));
                    response.end();
                });
            });
        } else {
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write("no data");
            response.end();
        }
    });
}

function find(response, request) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('place');
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
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        console.log("FILES: " + JSON.stringify(files));
        console.log("FIELDS: " + JSON.stringify(fields));
        if (files.file) {
            cloudinary.uploader.upload(files.file.path, function (result) {
                console.log(JSON.stringify(result));
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(result.url);
                response.end();
            });
        } else {
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write("no image");
            response.end();

        }
    });
}

function list(response) {
    console.log("Request handler 'list' was called.");
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('place');
        collection.find({}, {"_id": 0}).toArray(function(err, docs) {
            var test = JSON.stringify(docs);
            console.log(test);
            db.close();
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(test);
            response.end();
        });
    });
}

exports.start = start;
exports.add = add;
exports.find = find;
exports.upload = upload;
exports.list = list;
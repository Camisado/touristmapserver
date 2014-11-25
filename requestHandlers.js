var querystring = require("querystring");
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var url = 'mongodb://camisado:test@ds053090.mongolab.com:53090/heroku_app31942135';

function start(response, postData) {
    MongoClient.connect(url, function(err, db) {
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
    });
}

function add(response, postData) {
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

function find(response, postData) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('test');
        var doc1 = {'hello':'doc1'};
        collection.find(querystring.parse(postData.query), {"_id": 0}).toArray(function(err, docs) {
            var test = JSON.stringify(docs);
            console.log(test);
            db.close();
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(test);
            //console.log(querystring.parse(postData.query));
            response.end();
        });
    });
}

exports.start = start;
exports.add = add;
exports.find = find;
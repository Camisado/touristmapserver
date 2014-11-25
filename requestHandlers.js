var querystring = require("querystring");
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var url = 'mongodb://camisado:test@ds053090.mongolab.com:53090/heroku_app31942135';

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        var collection = db.collection('test');
        var doc1 = {'hello':'doc1'};
        //collection.insert(doc1, function(err, result) {});
        collection.find({}, {"_id": 0}).toArray(function(err, docs) {
            console.log("Found the following records");
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
    console.log("Request handler 'add' was called.");
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        var collection = db.collection('test');
        var doc1 = {'hello':'doc1'};
        collection.insert(doc1, function(err, result) {
            console.log("Inserted 1 document into the document collection");
            db.close();
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(JSON.stringify(doc1));
            response.end();
        });
    });
    /*response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent the text: \n"+
    querystring.parse(postData).text);
    response.end();*/
}

exports.start = start;
exports.add = add;
var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = url.parse(request.url);
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+
            postDataChunk + "'.");
        });

        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });

    }

    http.createServer(onRequest).(process.env.PORT || 5000);
    console.log("Server has started.");
}

exports.start = start;
var http = require("http");

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Heroku");
    response.end();
}).listen(8888);
console.log("server started.");
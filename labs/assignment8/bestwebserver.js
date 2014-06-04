function serveErrorPage(request, response) {
    // 200 is the status code for success
    response.writeHead(200, {'Content-Type': 'text/html; charset = UTF-8'});
    // respond with a basic HTML web page
    response.write("<!DOCTYPE html>");
    response.write("<html>");
    response.write("<head>");
    response.write("<title>JavaScript for Programmers</title>");
    response.write("</head>");
    response.write("<body>");
    response.write("<h2>Page Not FOUND!</h2>");
    response.write("</body>");
    response.end("</html>");
};


function loadPage(request, response) {
    var url = require ('url');
    var path = url.parse(request.url).pathname;
    var clean_url = path.replace(/^\/(.*)/,"$1");

    // have a strategy for dealing with index page
    if (path == '/') {
        clean_url = 'index.html';
    }

    // Load the file system module
    var fs = require("fs");
    // Read the file asynchronously and call the callback function when done
    fs.readFile(clean_url, "utf8", function (error, content) {
            if (error) {
                console.log("ERROR!");
                serveErrorPage(request, response);
            } else {
                // If there is no error, display the output
                response.writeHead(200, {'Content-Type': 'text/html; charset = UTF-8'});
                response.end(content);
            }
        }
    );
}


// load the http module
var http = require('http');
// create a server object
var server = http.createServer(loadPage);
// listen on port 8080
server.listen(8080, 'localhost');
// log an informational message
console.log('Server running at http://localhost:8080');
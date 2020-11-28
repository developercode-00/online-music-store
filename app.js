let http = require('http');
let fs = require('fs');
let path = require('path');

http.createServer(function (req, res) {
    if (req.url == "/") {
        fs.readFile("./public/index.html", "UTF-8", function (err, html) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        })
    }else if(req.url == "/contact") {
        fs.readFile("./public/contact.html", "UTF-8",function (err, contact){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(contact);
        })
    }else if (req.url.match("\.css$")) {
        var cssPath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, { "Content-Type": "text/css" });
        fileStream.pipe(res);
    } else if (req.url.match("\.png$")) {
        var imagePath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, { "Content-Type": "image/png" });
        fileStream.pipe(res);
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("no page found")
    }

}).listen(3005);
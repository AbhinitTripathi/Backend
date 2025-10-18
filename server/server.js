const http = require("http");
const fs = require("fs");
const path = require("path");

// Select port to listen on
const PORT = 8080;

// Create a server
const server = http.createServer((req, res) => {
    const file_path = path.join(__dirname, req.url === "/" ? "index.html" : req.url)

    const ext_name = String(path.extname(file_path.toLowerCase()));

    // Media Type: tells the browser how to treat the provided extension files
    const mime_type = {
        ".html" : "text/html",
        ".css" : "text/css",
        ".js" : "text/javascript",
        ".png" : "image/png"
    }

    // Get the content type of the file/s to be sent to the client
    // If file type is upported (int mime_type object) return that type in header
    // Else send a generic binary file types
    const content_type = mime_type[ext_name] || "appllication/octet-stream" // octet-stream is a generic binary file type

    // SERVE FILES TO THE CLIENT
    fs.readFile(file_path, (err, content) => {
        if (err) {
            if (err.code === "ENOENT") { // Erron NO ENTry
                res.writeHead(404, { "Content-Type" : "text/html" });
                res.end("404 : File Not Found");
            } 
        } else {
            // write head part of the body
            res.writeHead(200, {"Content-Type" : content_type});
            // write response body
            res.end(content, "utf-8");
        }
    })
});

// Listen on defined PORT
server.listen(PORT, () => {
    console.log(`Server Listening on PORT: ${PORT}`);
})
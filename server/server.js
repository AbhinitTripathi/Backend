const http = require("http");
const fs = require("fs");
const path = require("path");

// Select port to listen on
const PORT = 8080;

// Create a server
const server = http.createServer();

// Listen on defined PORT
server.listen(PORT, () => {
    console.log(`Server Listening on PORT: ${PORT}`);
})
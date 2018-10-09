/**
 * Node.js Master Class
 * Homework Assignment #1
 *
 * Task: A Simple RESTful JSON API
 */
const http = require('http');
const url = require('url');

// Store all config
const config = {
  httpPort: 3000,
};

// HTTP Server
// - Responds to all requests
const httpServer = http.createServer((req, res) => server(req, res));

// Server Logic
const server = (req, res) => res.end('Hello World');

// Start the server and listen on chosen port
httpServer.listen(config.httpPort, () => {
  console.log(`HTTP Server is listening on port ${config.httpPort}`);
});

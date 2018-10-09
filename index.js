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
const server = (req, res) => {
  // Get url and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get path from url
  const pathName = parsedUrl.pathname;
  // trim the path, - get rid of extraneous slashes at beginning and end of pathname
  // e.g. `/hello/world/` => `hello/world`
  const trimmedPath = pathName.replace(/^\/+|\/+$/g, '');

  console.log('pathName: ', pathName);
  console.log('trimmedPath: ', trimmedPath);

  // get http method
  // e.g: `GET / PUT / DELETE` etc...
  const method = req.method.toLowerCase();

  // Get the query string object
  const queryStringObject = parsedUrl.query;

  // Get headers a sobject
  const headers = req.headers;

  console.log('method', method);
  console.log('queryStringObject', queryStringObject);
  console.log('headers', headers);
  // Send the response
  // construct data object to send to the handler
  const data = {
    trimmedPath,
    queryStringObject,
    method,
  };

  // Log the request path
  res.end('Hello World');
};

// Start the server and listen on chosen port
httpServer.listen(config.httpPort, () => {
  console.log(`HTTP Server is listening on port ${config.httpPort}`);
});

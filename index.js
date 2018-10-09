/**
 * Node.js Master Class
 * Homework Assignment #1
 *
 * Task: A Simple RESTful JSON API
 */
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

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
  // NB: pass true param to get the query object
  const parsedUrl = url.parse(req.url, true);

  // Get path from url
  const pathName = parsedUrl.pathname;
  // trim the path, - get rid of extraneous slashes at beginning and end of pathname
  // e.g. `/hello/world/` => `hello/world`
  const trimmedPath = pathName.replace(/^\/+|\/+$/g, '');

  // Get http method:
  // e.g: `GET / PUT / DELETE` etc...
  // and convert to lowercase
  const method = req.method.toLowerCase();

  // Get the query string object
  const queryStringObject = parsedUrl.query;

  // Get headers as a object
  const headers = req.headers;

  // Get the payload if there is one,
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  // Append data stream into buffer, through the decoder
  req.on('data', data => (buffer += decoder.write(data)));

  // When finished, work out how to handle the request
  req.on('end', () => {
    buffer += decoder.end();

    // Choose the handler for this request
    // if none found default to `notFound` handler
    const chosenHandler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;

    // Construct data object to send to the handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer,
    };

    chosenHandler(data, (statusCode, payload) => {
      // Use the called back statusCode from the handler or default to 200
      statusCode = typeof statusCode === 'number' ? statusCode : 200;

      // Use the called back payload from the handler or default to `{}`
      payload = typeof payload === 'object' ? payload : {};
      // Convert payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log(
        `Returned response - statusCode: ${statusCode}, payload: ${payloadString}`,
      );
    });
  });
};

// Define a Routing handler
const handlers = {};

// ping handler - confirms server is running
handlers.ping = (data, callback) => {
  callback(200);
};

// hello handler - returns a welcome message
handlers.hello = (data, callback) => {
  callback(200, { message: `Welcome to my simple JSON API` });
};

// Not found handler:
// - Used when no handler can be found in the router
handlers.notFound = (data, callback) => {
  callback(404);
};

// Define a request router
const router = {
  ping: handlers.ping,
  hello: handlers.hello,
};

// Start the server and listen on chosen port
httpServer.listen(config.httpPort, () => {
  console.log(`HTTP Server is listening on port ${config.httpPort}`);
});

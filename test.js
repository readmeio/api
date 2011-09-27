var api = require('./')('http'),
    msg = 'Hello World!';

var server = new api.Server();
server.listen(1337, '127.0.0.1');

function error404(res) {
  res.writeHead(404);
  res.end('Not found.\n');
};

// Listen for regular requests and end with an 404 error.
server.on('regularRequest', function(req, res) {
  error404(res);
});

// Listen for requests to /hello-world.
server.on('/hello-world', function(req, res) {
  if (req.method == 'GET') {
    res.writeHead(200);
    res.end(msg+'\n');
  } else if (req.method == 'POST') {
    res.writeHead(200);
    msg = '';

    // Update the message
    req.on('data', function(chunk) {
      msg += chunk;
    });

    // After the POST request has ended, end with the message.
    req.on('end', function() {
      res.end('Successfully changed message to "'+msg+'".\n');
    });
  } else {
    error404(res);
  }
});

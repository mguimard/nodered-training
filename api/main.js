const http = require('http');

const server = http.createServer(function(req, res) {
  console.log(req.url)
  switch(req.url) {
    case '/temp' : 
      res.writeHead(200);
      const data = Math.round(Math.random() * 100)
      res.end(`{"temp" : ${data}}`);
    break;

    default: 
    res.writeHead(200);
    res.end(`Hello world`);
    break;
  }
  
});

server.listen(3000);

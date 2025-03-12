const { stat } = require('fs');
const http = require('http');

let desk_id = 0;
let number_of_desks = 20
let desks = {}

const statuses = [
  'available',
  'absent',
  'busy',
  'offline'
]

const server = http.createServer(function(req, res) {

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Max-Age': 2592000
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers)
    res.end()
    return
  }

  console.log(req.url)

  switch(req.url) {
    case '/temp' : 
      res.writeHead(200, headers);
      const data = Math.round(Math.random() * 100)
      res.end(`{"temp" : ${data}}`);
    break;

    default:

      if(req.url.startsWith('/user/status/')){
        let username = req.url.replace('/user/status/','');
        
        if(!username){
          res.writeHead(400);
          res.end("User name cannot be empty");
          return;
        }

        if(desks[username] === undefined){
          if(desk_id >= number_of_desks) {
            res.writeHead(400);
            res.end("Desk limit reached.");
            return;
          }
          desks[username] = desk_id++;
        }

        res.writeHead(200);
        res.end(JSON.stringify({
          username,
          desk: desks[username],
          status: statuses[Math.round(Math.random()*1000) % statuses.length]
        }));
        return;
      }

      res.writeHead(200);
      res.end(`Hello world`);
    break;
  }
  
});

server.listen(3000);

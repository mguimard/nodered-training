const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3001 })

let clients = []



wss.on('connection', (ws) => {
    console.log('New client')
    clients.push(ws)

    ws.on('error', console.error)

    ws.on('message', function message(data) {
        console.log('received: %s', data);

        for(let client of clients){
            client.send(data)
        }
    });

    ws.send('welcome')
})


console.log('websocket server started')
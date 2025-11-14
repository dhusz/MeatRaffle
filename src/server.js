// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ host: '0.0.0.0', port: 8080 });

function heartbeat() { this.isAlive = true; }

wss.on('connection', ws => {
    ws.isAlive = true;
    ws.on('pong', heartbeat);

    console.log('Client connected');

    ws.on('message', message => {
        console.log('Received:', message.toString());

        // Just broadcast the message to all other clients
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => console.log('Client disconnected'));
});

// Keep connections alive
setInterval(() => {
    wss.clients.forEach(ws => {
        if (!ws.isAlive) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
    });
}, 30000);

console.log('✅ WebSocket server running on ws://localhost:8080');

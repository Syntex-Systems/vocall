const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Enable CORS for all routes
app.use(cors());

// Serve a simple status endpoint to verify server is running
app.get('/', (req, res) => {
  res.send('PeerJS Server is running');
});

// Configure PeerJS server
const peerServer = ExpressPeerServer(server, {
  debug: true, // Enable debug logs for troubleshooting
  path: '/peerjs', // Route for PeerJS connections
  port: process.env.PORT || 9000, // Use environment port or default to 9000
});

// Mount PeerJS server on /peerjs route
app.use('/peerjs', peerServer);

// Handle PeerJS server events
peerServer.on('connection', (client) => {
  console.log(`Client connected: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
  console.log(`Client disconnected: ${client.getId()}`);
});

// Start the server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`PeerJS Server running on port ${PORT}`);
});
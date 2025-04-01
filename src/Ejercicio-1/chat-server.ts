import net from 'net';

const clients: net.Socket[] = [];

const server = net.createServer((connection) => {
  console.log(`A client has connected.`);
  clients.push(connection);

  connection.write(`Welcome to the chat!\n`);

  connection.on('data', (data) => {
    const message = data.toString().trim();
    console.log(`Message received: ${message}`);

    clients.forEach(client => {
      if (client !== connection) {
        client.write(`Client says: ${message}`);
      }
    });
  });

  connection.on('close', () => {
    console.log(`A client has disconnected`);
    clients.splice(clients.indexOf(connection), 1);
  });
});

server.listen(60300, () => {
  console.log(`Chat server is running on port 60300`);
});
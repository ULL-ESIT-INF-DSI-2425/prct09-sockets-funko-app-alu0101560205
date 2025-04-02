import net from 'net';
import { spawn } from 'child_process';

const server = net.createServer((connection) => {
  console.log('A client has connected');

  let commandOutput = '';
  let message = '';
  connection.on('data', (data) => {
    message = data.toString();
    console.log(`Message received: ${message}`);
    if (message.length !== 0) {
      const commandReceived = spawn(message);
      commandReceived.stdout.on('data', (piece) => commandOutput += piece);
      connection.write(commandOutput);
    } else {
      console.log(`Debe haber un error`);
    }
  });

  connection.write(commandOutput);

  connection.on('close', () => {
    console.log(`A client has disconnected`);
  });
});

server.listen(60300, () => {
  console.log(`Server is running on port 60300`);
});
import net from 'net';
import { ReadLine } from 'readline';

const client = net.connect({port: 60300 }, () => {
  console.log(`Connected to the server.`);
});

// client.on('data', (data) => {
//   console.log(data.toString());
// });

process.stdin.on('data', (data) => {
  client.write(data);
});

client.on('close', () => {
  console.log('Disconnected from server.');
});
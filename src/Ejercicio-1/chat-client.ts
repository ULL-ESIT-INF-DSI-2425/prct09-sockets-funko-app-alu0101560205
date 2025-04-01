import net from 'net';

const client = net.connect({port: 60300 }, () => {
  console.log(`Connected to the server.`);
})

client.on('data', (data) => {
  console.log(data.toString().trim());
})

process.stdin.on('data', (data) => {
  client.write(data);
});

client.on('close', () => {
  console.log('Disconnected from server.');
});
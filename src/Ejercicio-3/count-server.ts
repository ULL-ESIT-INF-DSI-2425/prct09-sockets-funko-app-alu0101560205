/**
 * Ejercicio 3: Basandonos en el ejercicio 2, haremos un contador de clientes que se han conectado, y además 
 * enviaremos dicho numero a cada nuevo cliente
 */

import net from 'net'

let clientCount: number = 0; // Contador de clientes

const server = net.createServer((connection) => {
  clientCount++;
  console.log(`A client has connected. Total clients actually is ${clientCount}`);

  // Enviamos el numero de cliente al cliente que se conectó
  connection.write(`You are the client number ${clientCount}`);

  connection.on('data', (data) => {
    const message = data.toString();
    console.log(`Received: ${message}`);
    // connection.write(`Echo: ${message}`);
  });

  connection.on('close', () => {
    console.log('A client has disconnected.');
  });
});

server.listen(60300, () => {
  console.log('Echo server is running on port 60300.');
});
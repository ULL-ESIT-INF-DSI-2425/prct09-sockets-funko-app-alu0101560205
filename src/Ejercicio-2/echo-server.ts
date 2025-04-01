/**
 * Ejercicio 2: Crear un servidor que devuelva exactamente lo que recibe de un cliente.
 */
import net from 'net'

const server = net.createServer((connection) => {
  console.log(`A client has connected`);

  connection.on('data', (data) => {
    const message = data.toString();
    console.log(`Received: ${message}`); // Escrito en servidor
    connection.write(`Echo: ${message}`); // Escrito en cliente
  });

  connection.on('close', () => {
    console.log(`A client has disconnected`);
  });
});

server.listen(60300, () => {
  console.log(`Echo server is running on port 60300.`);
});
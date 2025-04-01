/**
 * Ejercicio 3: Basandonos en el ejercicio 2, haremos un contador de clientes que se han conectado, y además 
 * enviaremos dicho numero a cada nuevo cliente
 */

import net from 'net';

const client = net.connect({ port: 60300 }, () => {
  console.log('Connected to server.');
});

client.on('data', (data) => {
  console.log(data.toString());
});

client.on('close', () => {
  console.log('Disconnected from server.');
});
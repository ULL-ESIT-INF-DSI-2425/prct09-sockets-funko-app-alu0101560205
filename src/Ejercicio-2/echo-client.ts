/**
 * Ejercicio 2: Crear un servidor que devuelva exactamente lo que recibe de un cliente.
 */
import net from 'net'

const client = net.connect({port: 60300}, () => {
  console.log('Connected to echo server');
});

// Leer entrada desde la terminal y enviarla al servidor
process.stdin.on('data', (data) => {
  client.write(data);
});

client.on('data', (data) => {
  console.log(data.toString());
});

client.on('close', () => {
  console.log('Disconnected from server');
});
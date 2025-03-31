import { FunkoCollection, Funko, FunkoType, FunkoGenre } from "./Funko.js";
import net from 'net';

const server = net.createServer((connection) => {
  console.log('Client connected');
  connection.on('data', (data) => {
    try {
      const request = JSON.parse(data.toString());
      const { command, user, funko } = request;
      const collection = new FunkoCollection(user);
      let response;

      switch (command) {
        case 'add':
          collection.addFunko(funko);
          response = { status: 'success', message: 'Funko added successfully' };
          break;
        case 'update':
          collection.updateFunko(funko);
          response = { status: 'success', message: 'Funko updated successfully' };
          break;
        case 'remove':
          collection.removeFunko(funko.id);
          response = { status: 'success', message: 'Funko removed successfully' };
          break;
        case 'list':
          collection.listFunkos();
          response = { status: 'success', message: 'List of Funkos displayed' };
          break;
        case 'show':
          collection.showFunko(funko.id);
          response = { status: 'success', message: 'Funko details displayed' };
          break;
        default:
          response = { status: 'error', message: 'Invalid command' };
      }
      connection.write(JSON.stringify(response));
    } catch (error) {
      connection.write(JSON.stringify({ status: 'error', message: 'Invalid request format' }));
    }
  });
  
  connection.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(60300, () => {
  console.log('Server listening on port 60300');
});

import net from 'net';

//const client = new net.Socket();
const client = net.connect({port: 60300});
const PORT = 60300;
const HOST = 'localhost';

const request = {
  command: 'show', // Puede ser 'add', 'update', 'remove', 'list', 'show'
  user: 'estela',
  funko: [{ id: 1 }] // El ID del Funko que quieres mostrar 
  // funko: {
  //   id: 1,
  //   name: 'Batman',
  //   description: 'Funko de Batman',
  //   type: 'Pop!',
  //   genre: 'Películas y TV',
  //   franchise: 'DC Comics',
  //   number: 1,
  //   exclusive: false,
  //   specialFeatures: 'Brilla en la oscuridad',
  //   marketValue: 30
  // }
};

client.connect(PORT, HOST, () => {
  console.log('Connected to server');
  client.write(JSON.stringify(request));
});

client.on('data', (data) => {
  console.log('Response from server:', data.toString());
  client.end();
});

client.on('close', () => {
  console.log('Connection closed');
});

client.on('error', (err) => {
  console.error('Connection error:', err.message);
});


// import net from 'net';
// import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers';

// const PORT = 60300;
// const HOST = 'localhost';

// const argv = yargs(hideBin(process.argv))
//   .command('add', 'Añadir un nuevo Funko', {
//     user: { type: 'string', demandOption: true },
//     id: { type: 'number', demandOption: true },
//     name: { type: 'string', demandOption: true },
//     description: { type: 'string', demandOption: true },
//     type: { type: 'string', demandOption: true },
//     genre: { type: 'string', demandOption: true },
//     franchise: { type: 'string', demandOption: true },
//     number: { type: 'number', demandOption: true },
//     exclusive: { type: 'boolean', demandOption: true },
//     specialFeatures: { type: 'string', demandOption: true },
//     marketValue: { type: 'number', demandOption: true }
//   }, (args) => {
//     sendRequest({
//       type: 'add',
//       user: args.user,
//       funkoPop: [{
//         id: args.id,
//         name: args.name,
//         description: args.description,
//         type: args.type,
//         genre: args.genre,
//         franchise: args.franchise,
//         number: args.number,
//         exclusive: args.exclusive,
//         specialFeatures: args.specialFeatures,
//         marketValue: args.marketValue
//       }]
//     });
//   })
//   .command('list', 'Listar todos los Funkos de un usuario', {
//     user: { type: 'string', demandOption: true }
//   }, (args) => {
//     sendRequest({ type: 'list', user: args.user });
//   })
//   .command('remove', 'Eliminar un Funko', {
//     user: { type: 'string', demandOption: true },
//     id: { type: 'number', demandOption: true }
//   }, (args) => {
//     sendRequest({ type: 'remove', user: args.user, funkoPop: [{ id: args.id }] });
//   })
//   .command('read', 'Leer un Funko específico', {
//     user: { type: 'string', demandOption: true },
//     id: { type: 'number', demandOption: true }
//   }, (args) => {
//     sendRequest({ type: 'read', user: args.user, funkoPop: [{ id: args.id }] });
//   })
//   .help()
//   .argv;

//   function sendRequest(request: any) {
//     console.log("Sending request:", JSON.stringify(request, null, 2)); // Agregado para depuración
    
//     const client = new net.Socket();
//     client.connect(PORT, HOST, () => {
//       console.log('Connected to server');
//       client.write(JSON.stringify(request));
//     });
  
//     client.on('data', (data) => {
//       console.log('Response from server:', data.toString());
//       client.end();
//     });
  
//     client.on('close', () => {
//       console.log('Connection closed');
//     });
  
//     client.on('error', (err) => {
//       console.error('Connection error:', err.message);
//     });
//   }
  

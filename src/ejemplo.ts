import {writeFile} from 'fs';
import {readFile} from 'fs';

// Crear y escribir en un fichero
writeFile('helloworld.txt', 'Hello World!', () => {
  console.log('File helloworld.txt has just been created');
});

// Leer el contenido de un fichero
readFile('helloworld.txt', (_, data) => {
  console.log(data.toString());
});

// Gestion de errores en la lectura de un fichero
readFile('what.txt', (err, data) => {
  if (err) {
    console.log('There must be a problem with the file you are trying to read');
  } else {
    console.log(data.toString());
  }
});

// Gestión de errores en la escritura
writeFile('holamundo.txt', 'Hola Mundooo!', (err) => {
  if (err) {
    console.log('Something went wrong when writing your file');
  } else {
    console.log('File holamundo.txt has just been created');
  }
});
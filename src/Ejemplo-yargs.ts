/**
 * Yargs permite parsear diferentes argumentos pasados a un programa desde
 *  la línea de comandos. En concreto permite gestionar diferentes comandos, 
 * cada uno de ellos, con sus opciones y manejador correspondientes.
 */

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('add', 'Adds a funko', {
  id: {
   description: 'Funko ID',
   type: 'number',
   demandOption: true
  }
 }, (argv) => {
  console.log(argv.id);
 })
 .help()
 .argv;
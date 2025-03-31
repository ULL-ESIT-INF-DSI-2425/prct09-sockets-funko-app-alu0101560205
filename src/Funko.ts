import fs from 'fs';
import { writeFile, readdir, readFile, unlink, mkdir, access } from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';

/**
 * Enumerado para definir el tipo de Funko
 */
enum FunkoType {
  Pop = "Pop!",
  PopRides = "Pop! Rides",
  VynilSoda = "Vynil Soda",
  VynilGold = "Vynil Gold"
}

/**
 * Enumerado para definir el genero del Funko
 */
enum FunkoGenre {
  Animation = "Animación",
  MoviesTV = "Películas y TV",
  VideoGames = "Videojuegos",
  Sports = "Deportes",
  Music = "Música",
  Anime = "Ánime"
}

/**
 * Interfaz para definir los atributos que debe tener un Funko
 */
interface Funko {
  id: number;
  name: string;
  description: string;
  type: FunkoType;
  genre: FunkoGenre;
  franchise: string;
  number: number;
  exclusive: boolean;
  specialFeatures: string;
  marketValue: number;
}

/**
 * Clase para representar la coleccion de objetos Funko
 */
class FunkoCollection {
  private userDir: string;

  /**
   * Constructor que crea el directorio del usuario si no existe
   * @param user - nombre del usuario
   */
  constructor(private user: string) {
    this.userDir = path.resolve('dist', 'collections', user);
    access(this.userDir, (err) => {
      if (err) {
        mkdir(this.userDir, { recursive: true }, (mkdirErr) => {
          if (mkdirErr) {
            console.log(chalk.red('Error creating user directory!'));
          }
        });
      }
    });
  }

  /**
   * Metodo para añadir un Funko a la coleccion
   * @param funko - objeto funko que se pretende añadir
   * @returns error en caso de que no consiga acceder al fichero
   */
  addFunko(funko: Funko): void {
    const filePath = path.resolve(this.userDir, `${funko.id}.json`);
    readdir(this.userDir, (err, files) => {
      if (err) {
        console.log(chalk.red('Error reading collection directory!'));
        return;
      }
      if (files.includes(`${funko.id}.json`)) {
        console.log(chalk.red('Funko already exists in the collection!'));
        return;
      }
      // Escribir el archivo si no existe
      writeFile(filePath, JSON.stringify(funko, null, 2), (err) => {
        if (err) {
          console.log(chalk.red('Something went wrong when writing the file.'));
        } else {
          console.log(chalk.green('New Funko added to collection!'));
        }
      });
    });
  }

  /**
   * Metodo para actualizar la informacion de un Funko
   * @param funko - funko que se pretende actualizar
   */
  updateFunko(funko: Funko): void {
    const filePath = path.resolve(this.userDir, `${funko.id}.json`);
    readdir(this.userDir, (err, files) => {
      if (err) {
        console.log(chalk.red('Error reading collection directory!'));
        return;
      }
      if (!files.includes(`${funko.id}.json`)) {
        console.log(chalk.red('Funko not found in the collection!'));
        return;
      }
      writeFile(filePath, JSON.stringify(funko, null, 2), (err) => {
        if (err) {
          console.log(chalk.red('Error updating Funko!'));
        } else {
          console.log(chalk.green('Funko updated successfully!'));
        }
      });
    });
  }
  
  /**
   * Método para eliminar un funko dado su ID
   * @param id - ID del funko a eliminar
   */
  removeFunko(id: number): void {
    const filePath = path.resolve(this.userDir, `${id}.json`);
    readdir(this.userDir, (err, files) => {
      if (err) {
        console.log(chalk.red('Error reading collection directory!'));
        return;
      }
      if (!files.includes(`${id}.json`)) {
        console.log(chalk.red('Funko not found in the collection!'));
        return;
      }
      unlink(filePath, (err) => {
        if (err) {
          console.log(chalk.red('Error deleting Funko!'));
        } else {
          console.log(chalk.green('Funko removed from collection!'));
        }
      });
    });
  }

  /**
   * Metodo para listar los funkos
   */
  listFunkos(): void {
    readdir(this.userDir, (err, files) => {
      if (err) {
        console.log(chalk.red('Error reading collection directory!'));
        return;
      }
      if (files.length === 0) {
        console.log(chalk.yellow('No Funkos found in the collection.'));
        return;
      }
      files.forEach(file => {
        const filePath = path.resolve(this.userDir, file);
        readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            console.log(chalk.red(`Error reading Funko: ${file}`));
            return;
          }
          const funko: Funko = JSON.parse(data);
          let color;
          if (funko.marketValue > 50) color = chalk.green;
          else if (funko.marketValue > 20) color = chalk.blue;
          else if (funko.marketValue > 10) color = chalk.yellow;
          else color = chalk.red;
          console.log(color(`ID: ${funko.id}\nName: ${funko.name}\nDescription: ${funko.description}\nType: ${funko.type}\nGenre: ${funko.genre}\nFranchise: ${funko.franchise}\nNumber: ${funko.number}\nExclusive: ${funko.exclusive}\nSpecial Features: ${funko.specialFeatures}\nPrice: ${funko.marketValue}€\n`));
        });
      });
    });
  }

  /**
   * Metodo para mostrar la informacion de un unico Funko
   * @param id - ID del funko que se pretende mostrar
   */
  showFunko(id: number): void {
    const filePath = path.resolve(this.userDir, `${id}.json`);
    readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.log(chalk.red('Funko not found in the collection!'));
        return;
      }
      const funko: Funko = JSON.parse(data);
      let color;
      if (funko.marketValue > 50) color = chalk.green;
      else if (funko.marketValue > 20) color = chalk.blue;
      else if (funko.marketValue > 10) color = chalk.yellow;
      else color = chalk.red;
      console.log(chalk.magenta(`Funko ID: ${funko.id}`));
      console.log(chalk.cyan(`Name: ${funko.name}`));
      console.log(chalk.white(`Description: ${funko.description}`));
      console.log(chalk.gray(`Franchise: ${funko.franchise}`));
      console.log(color(`Market Value: ${funko.marketValue}€`));
    });
  }
}

const argv = yargs(hideBin(process.argv))
  .command('add', 'Adds a Funko to the collection', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    name: { type: 'string', demandOption: true },
    description: { type: 'string', demandOption: true },
    type: { type: 'string', choices: Object.values(FunkoType), demandOption: true },
    genre: { type: 'string', choices: Object.values(FunkoGenre), demandOption: true },
    franchise: { type: 'string', demandOption: true },
    number: { type: 'number', demandOption: true },
    exclusive: { type: 'boolean', demandOption: true },
    specialFeatures: { type: 'string', demandOption: true },
    marketValue: { type: 'number', demandOption: true },
  }, (args) => {
    const collection = new FunkoCollection(args.user);
    collection.addFunko({
      id: args.id,
      name: args.name,
      description: args.description,
      type: args.type as FunkoType,
      genre: args.genre as FunkoGenre,
      franchise: args.franchise,
      number: args.number,
      exclusive: args.exclusive,
      specialFeatures: args.specialFeatures,
      marketValue: args.marketValue,
    });
  })
  .command('update', 'Updates an existing Funko in the collection', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    name: { type: 'string', demandOption: true },
    description: { type: 'string', demandOption: true },
    type: { type: 'string', choices: Object.values(FunkoType), demandOption: true },
    genre: { type: 'string', choices: Object.values(FunkoGenre), demandOption: true },
    franchise: { type: 'string', demandOption: true },
    number: { type: 'number', demandOption: true },
    exclusive: { type: 'boolean', demandOption: true },
    specialFeatures: { type: 'string', demandOption: true },
    marketValue: { type: 'number', demandOption: true },
  }, (args) => {
    const collection = new FunkoCollection(args.user);
    collection.updateFunko({
      id: args.id,
      name: args.name,
      description: args.description,
      type: args.type as FunkoType,
      genre: args.genre as FunkoGenre,
      franchise: args.franchise,
      number: args.number,
      exclusive: args.exclusive,
      specialFeatures: args.specialFeatures,
      marketValue: args.marketValue,
    });
  })
  .command('remove', 'Removes a Funko from the collection', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
  }, (args) => {
    const collection = new FunkoCollection(args.user);
    collection.removeFunko(args.id);
  })
  .command('list', 'Lists all Funkos in the collection', {
    user: { type: 'string', demandOption: true },
  }, (args) => {
    const collection = new FunkoCollection(args.user);
    collection.listFunkos();
  })
  .command('show', 'Shows details of a specific Funko', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
  }, (args) => {
    const collection = new FunkoCollection(args.user);
    collection.showFunko(args.id);
  })
  .help()
  .argv;

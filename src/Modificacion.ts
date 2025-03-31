import chalk from 'chalk';
import fs, { access, readdir, readFile, writeFile } from 'fs';
import path, { dirname } from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const listInformation = (dirName: string): void => {
  readdir(dirName, (err, files) => {
    if (err) {
      console.log(chalk.red('Error en el directorio'));
    }
    if (files.length === 0) {
      console.log(chalk.yellow('No hay archivos que listar en el directorio.'));
    }
    files.forEach(file => {
      const filePath = path.resolve(file);
      console.log(filePath);
    });
  });
}

console.log(listInformation("dist"));

const deleteFile = (fileName: string): void => {
  const binPath = path.resolve('dist', 'Dir_Modificacion', 'bin');
  const filePath = path.resolve('dist', 'Dir_Modificacion', fileName);
  let contentOfTheFile: string = "";
  readFile(filePath, (err, data) => {
    if (err) {
      console.log('There must be a problem with the file you are trying to read');
    } else {
      contentOfTheFile = data.toString();
      writeFile(binPath, contentOfTheFile, (err) => {
        // console.log(contentOfTheFile);
        if (err) {
          console.log('Something went wrong when writing your file');
        } else {
          console.log('File has just been created');
        }
      });
    }
  });
}

console.log(deleteFile("modif2.txt"));

const moveFile = (fileName: string, destino: string): void => {
  const filePath = path.resolve('dist', 'Dir_Modificacion', fileName);
  const destinyPath = path.resolve(destino);
  let contentOfTheFile: string = "";
  readFile(filePath, (err, data) => {
    if (err) {
      console.log('There must be a problem with the file you are trying to read');
    } else {
      contentOfTheFile = data.toString();
      writeFile(destinyPath, contentOfTheFile, (err) => {
        // console.log(contentOfTheFile);
        if (err) {
          console.log('Something went wrong when writing your file');
        } else {
          console.log('File has just been moved');
        }
      });
    }
  });
}
import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';

// Programa 1: Contar ocurrencias de palabras clave en logs
const countOccurrences = (filePath: string, keyword: string): void => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(chalk.red('Error reading file:', err));
      return;
    }
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');  // Asegurarse de que se busque la palabra exacta
    const matches = data.match(regex); // Encuentra todas las coincidencias
    const count = matches ? matches.length : 0;
    console.log(chalk.green(`The keyword "${keyword}" appears ${count} times.`));
  });
};



// Programa 2: Convertir JSON a CSV
const convertJsonToCsv = (inputPath: string, outputPath: string): void => {
  fs.readFile(inputPath, 'utf8', (err, data) => {
    if (err) {
      console.log(chalk.red('Error reading JSON file:', err));
      return;
    }
    try {
      const jsonData: Record<string, any>[] = JSON.parse(data); // Definimos el tipo de jsonData
      const headers = Object.keys(jsonData[0]).join(',');
      const rows = jsonData.map((row: Record<string, any>) => Object.values(row).join(',')); // Aquí definimos el tipo de row
      const csvData = [headers, ...rows].join('\n');
      fs.writeFile(outputPath, csvData, (writeErr) => {
        if (writeErr) {
          console.log(chalk.red('Error writing CSV file:', writeErr));
        } else {
          console.log(chalk.green(`CSV file saved successfully at ${outputPath}`));
        }
      });
    } catch (parseErr) {
      console.log(chalk.red('Error parsing JSON:', parseErr));
    }
  });
};

// Configuración de Yargs
const argv = yargs(hideBin(process.argv))
  .command('count', 'Count occurrences of a keyword in a log file', {
    file: { type: 'string', demandOption: true },
    keyword: { type: 'string', demandOption: true },
  }, (args) => {
    countOccurrences(args.file, args.keyword);
  })
  .command('convert', 'Convert a JSON file to CSV', {
    input: { type: 'string', demandOption: true },
    output: { type: 'string', demandOption: true },
  }, (args) => {
    convertJsonToCsv(args.input, args.output);
  })
  .help()
  .argv;

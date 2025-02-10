import * as fs from 'fs';
import * as path from 'path';

// Directorio donde se guardarán los logs
const logDirectory = path.join(__dirname, '../../logs');

// Asegurarse de que el directorio de logs exista
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Función para obtener el nombre del archivo de log basado en la fecha
function getLogFileName(): string {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();
  
  return `${year}-${month}-${day}.log`; // Appends the date in YYYY-MM-DD format
}

// Función para registrar los logs en un archivo
export function logToFile(message: string, level: string = 'info') {
  const logMessage = `[${new Date().toISOString()}] [${level}] - ${message}\n`;
  const logFileName = getLogFileName();
  
  // Escribir el log en el archivo correspondiente
  fs.appendFileSync(path.join(logDirectory, logFileName), logMessage, 'utf8');
}

// Función para registrar logs en consola
export function logToConsole(message: string, level: string = 'info') {
  console.log(`[${new Date().toISOString()}] [${level}] - ${message}`);
}

// Función para manejar logs en consola y archivo
export function log(message: string, level: string = 'info') {
  logToConsole(message, level);
  logToFile(message, level);
}
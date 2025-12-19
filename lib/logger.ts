import fs from 'fs';
import path from 'path';

// Basic file logger - appends to leads-engine.log in the project root
// In a real production app, use a more robust logging library (Winston, Pino)
export function logToFile(message: string) {
    const logFilePath = path.join(process.cwd(), 'leads-engine.log');
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    try {
        fs.appendFileSync(logFilePath, logMessage, 'utf8');
    } catch (error) {
        console.error('Failed to write to log file:', error);
        // Fallback to console if file logging fails
        console.log(`LOG: ${message}`); 
    }
}

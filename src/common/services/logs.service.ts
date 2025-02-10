import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LogsService {
  private logsDir = path.join(__dirname, '../../logs');

  async getLogsByDate(date: string): Promise<string> {
    try {
      const logFileName = `${date}.log`;
      const logFilePath = path.join(this.logsDir, logFileName);

      if (!fs.existsSync(logFilePath)) {
        throw new NotFoundException(`No logs found for date: ${date}`);
      }

      const logData = fs.readFileSync(logFilePath, 'utf-8');
      return logData;
    } catch (error) {
      throw new Error('Error reading log file');
    }
  }
}

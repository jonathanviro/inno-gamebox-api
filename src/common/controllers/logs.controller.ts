import { Controller, Get, Query } from '@nestjs/common';
import { LogsService } from '../services/logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get('read')
  async readLogs(@Query('date') date: string) {
    return this.logsService.getLogsByDate(date);
  }
}

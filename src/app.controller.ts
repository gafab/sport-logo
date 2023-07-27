import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('logo/:tid')
  getLogo(@Res() response: Response, @Param('tid') tid: string): any {
    return this.appService.getLogo(response, tid);
  }
}

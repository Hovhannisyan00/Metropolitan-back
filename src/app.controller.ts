import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('all')
  async getAllDepartments() {
    return this.appService.getAllDepartments();
  }

  @Get('getDatas')
  async getDatas(
    @Query('departamentsid') departmentId: string,
    @Query('inputValue') inputValue: string,
  ) {
    return this.appService.getDatas(departmentId, inputValue);
  }
}

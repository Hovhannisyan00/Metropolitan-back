import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Fetch all art departments',
    description:
      'Returns a list of all art departments available in the museum.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched departments',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching departments',
  })
  async getAllDepartments() {
    return this.appService.getAllDepartments();
  }

  @Get('getDatas')
  @ApiOperation({
    summary: 'Search for artworks based on department and title',
    description:
      'Fetch artworks from a specific department matching a given title keyword.',
  })
  @ApiQuery({
    name: 'departamentsid',
    description: 'The department ID to search within',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'inputValue',
    description: 'The title or keyword to search for',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched search results',
  })
  @ApiResponse({
    status: 404,
    description: 'No artworks found for the given search criteria',
  })
  @ApiResponse({
    status: 500,
    description: 'Error fetching search results',
  })
  async getDatas(
    @Query('departamentsid') departmentId: string,
    @Query('inputValue') inputValue: string,
  ) {
    return this.appService.getDatas(departmentId, inputValue);
  }
}

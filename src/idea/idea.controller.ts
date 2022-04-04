import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HttpErrorFilter } from 'src/shared/http-error-filter';
import { IdeaDTO } from './idea.dto';
import { IdeaService } from './idea.service';
/* eslint-disable */
@Controller('api/idea')
export class IdeaController {
  constructor(private ideaService: IdeaService) {}
  private logger = new Logger('IdeaController');
  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }
  @Post()
  createIdea(@Body() data: IdeaDTO) {
    this.logger.log(JSON.stringify(data));
    return this.ideaService.create(data);
  }
  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }
  @Put(':id')
  updateIdea(@Param('id') id: string, @Body() data: Partial<IdeaDTO>) {
    this.logger.log(JSON.stringify(data));
    return this.ideaService.update(id, data);
  }
  @Delete(':id')
  destroyIdea(@Param('id') id: string) {
    return this.ideaService.destroy(id);
  }
}

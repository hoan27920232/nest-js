import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HttpErrorFilter } from 'src/shared/http-error-filter';
import { IdeaDTO } from './idea.dto';
import { IdeaService } from './idea.service';
/* eslint-disable */
@Controller('idea')
export class IdeaController {
  constructor(private ideaService: IdeaService) {}
  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }
  @Post()
  createIdea(@Body() data: IdeaDTO) {
    return this.ideaService.create(data);
  }
  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }
  @Put(':id')
  updateIdea(@Param('id') id: string, @Body() data: Partial<IdeaDTO>) {
    this.ideaService.update(id, data);
  }
  @Delete(':id')
  destroyIdea(@Param('id') id:string) {
      this.ideaService.destroy(id);
  }
}

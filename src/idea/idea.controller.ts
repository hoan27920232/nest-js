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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { HttpErrorFilter } from 'src/shared/http-error-filter';
import { User } from 'src/user/user.decorator';
import { IdeaDTO } from './idea.dto';
import { IdeaService } from './idea.service';
/* eslint-disable */
@Controller('api/idea')
export class IdeaController {
  constructor(private ideaService: IdeaService) {}
  private logger = new Logger('IdeaController');
  private logData(options: any) {
    options.userId &&
      this.logger.log(`User : ${JSON.stringify(options.userId)}`);
    options.data && this.logger.log(`Body : ${JSON.stringify(options.data)}`);
    options.id && this.logger.log(`Idea : ${JSON.stringify(options.id)}`);
  }
  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }
  @Post()
  @UseGuards(new AuthGuard())
  createIdea(@User('id') userId, @Body() data: IdeaDTO) {
    this.logData({ userId, data });
    return this.ideaService.create(data, userId);
  }
  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }
  @Put(':id')
  @UseGuards(new AuthGuard())
  updateIdea(
    @Param('id') id: string,
    @User('id') userId,
    @Body() data: Partial<IdeaDTO>,
  ) {
    this.logData({ id, userId, data });
    return this.ideaService.update(id, data, userId);
  }
  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyIdea(@Param('id') id: string, @User('id') userId) {
    this.logData({ id, userId });
    return this.ideaService.destroy(id, userId);
  }
}

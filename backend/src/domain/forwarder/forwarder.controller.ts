import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateDto } from '@domain/company/dto';
import { ForwarderService } from '@domain/forwarder/forwarder.service';
import { Forwarder } from '@shared/decorators/forwarder.decorator';
import { CurrentForwarder } from '@domain/auth/interfaces/currentForwarder.interface';

@Controller('forwarder')
export class ForwarderController {
  constructor(private forwarderService: ForwarderService) {}

  @Post('company')
  async insert(@Body() company: CreateDto, @Forwarder() forwarder: CurrentForwarder) {
    return this.forwarderService.insert(forwarder.id, company);
  }

  @Get('current')
  async getCurrent(@Forwarder() forwarder: CurrentForwarder) {
    return this.forwarderService.getOne({ id: forwarder.id });
  }
}

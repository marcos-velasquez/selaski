import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forwarder } from './forwarder.entity';
import { ForwarderService } from './forwarder.service';
import { ForwarderSubscriber } from './forwarder.subscriber';
import { ForwarderController } from './forwarder.controller';
import { CompanyModule } from '@domain/company/company.module';

@Module({
  imports: [CompanyModule, TypeOrmModule.forFeature([Forwarder])],
  providers: [ForwarderService, ForwarderSubscriber],
  exports: [ForwarderService],
  controllers: [ForwarderController],
})
export class ForwarderModule {}

import { Module } from '@nestjs/common';
import { UtentiService } from './utenti.service';
import { UtentiController } from './utenti.controller';

@Module({
  controllers: [UtentiController],
  providers: [UtentiService],
})
export class UtentiModule {}

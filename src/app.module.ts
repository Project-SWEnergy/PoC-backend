import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtentiModule } from './utenti/utenti.module';
import { RistorantiModule } from './ristoranti/ristoranti.module';

@Module({
  imports: [UtentiModule, RistorantiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

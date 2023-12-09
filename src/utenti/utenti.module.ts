import { Module } from '@nestjs/common';
import { UtentiService } from './utenti.service';
import { UtentiController } from './utenti.controller';
import { PrenotazioniModule } from './prenotazioni/prenotazioni.module';

@Module({
	imports: [PrenotazioniModule],
	controllers: [UtentiController],
	providers: [UtentiService],
})
export class UtentiModule { }

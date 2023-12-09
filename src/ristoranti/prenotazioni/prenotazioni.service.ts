import { Injectable } from '@nestjs/common';
import { UpdatePrenotazioniDto } from './dto/update-prenotazioni.dto';
import { db } from '../../db';
import { prenotazione, ordinazione, prenotazione_utente } from '../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PrenotazioniService {
	async findAll(id_ristorante: number) {
		return await db.select()
			.from(prenotazione)
			.where(eq(prenotazione.id_ristorante, id_ristorante))
	}

	// quando il ristorante guarda una prenotazione, probabilmente vuole vedere 
	// anche le ordinazioni ad essa associate: join con ordinazione
	async findOne(id_prenotazione: number) {
		return await db.select()
			.from(prenotazione)
			.where(eq(prenotazione.id, id_prenotazione))
			.leftJoin(ordinazione, eq(prenotazione.id, ordinazione.id_prenotazione))
			.leftJoin(prenotazione_utente, eq(prenotazione.id, prenotazione_utente.id_prenotazione))
	}

	async update(id_prenotazione: number, updatePrenotazioniDto: UpdatePrenotazioniDto) {
		return await db.update(prenotazione)
			.set(updatePrenotazioniDto)
			.where(eq(prenotazione.id, id_prenotazione))
			.returning()
	}

	async remove(id_prenotazione: number) {
		await db.delete(prenotazione)
			.where(eq(prenotazione.id, id_prenotazione))

	}
}

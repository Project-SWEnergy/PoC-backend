import { Injectable } from '@nestjs/common';
import { CreatePrenotazioniDto } from './dto/create-prenotazioni.dto';
import { UpdatePrenotazioniDto } from './dto/update-prenotazioni.dto';
import { db } from '../../db';
import { prenotazione, ristorante, ordinazione, prenotazione_utente } from '../../db/schema';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class PrenotazioniService {
	// per creare una prenotazione bisogna prima creare una riga nella tabella
	// prenotazione, e poi una riga nella tabella prenotazione_utente
	async create(id_utente: number, createPrenotazioniDto: CreatePrenotazioniDto) {
		const res = await db.insert(prenotazione)
			.values(createPrenotazioniDto)
			.returning()

		await db.insert(prenotazione_utente)
			.values({
				id_prenotazione: res[0].id,
				id_utente: id_utente
			})
			.execute()

		return res
	}

	// dal momento che più utenti possono partecipare alla stessa prenotazione
	// per accedere a tutte le prenotazioni degli utenti:
	// 1. si scorre la tabella prenotazione_utente
	// 2. si selezionano le prenotazioni dell'utente
	// 3. a ciascuna prenotazione così individuata si aggiungono le informazioni
	// della prenotazione
	// 4. a ciascuna prenotazione si aggiungono le informazioni del ristorante
	async findAll(id_utente: number) {
		return await db.select({
			id_prenotazione: prenotazione.id,
		})
			.from(prenotazione_utente)
			.where(eq(prenotazione_utente.id_utente, id_utente))
			.leftJoin(prenotazione,
				eq(prenotazione_utente.id_prenotazione, prenotazione.id))
			.innerJoin(
				ristorante,
				eq(prenotazione.id_ristorante, ristorante.id_ristorante))
	}

	// in questo caso è già noto l'id della prenotazione
	// quindi si può accedere direttamente alla tabella prenotazione:
	// 1. si seleziona la prenotazione
	// 2. si aggiungono le informazioni del ristorante
	// 3. si aggiungono le informazioni delle ordinazioni
	// Il risultato sarà un po' ridondante, perchè le informazioni della
	// prenotazione e del ristorante saranno ripetute per ogni ordinazione
	// TODO! evitare la ridondanza, capire quali informazioni sono necessarie
	async findOne(id_prenotazione: number) {
		return await db.select()
			.from(prenotazione)
			.where(eq(prenotazione.id, id_prenotazione))
			.innerJoin(ristorante, eq(prenotazione.id_ristorante, ristorante.id_ristorante))
			.leftJoin(ordinazione, eq(prenotazione.id, ordinazione.id_prenotazione))

	}

	// this is easy
	async update(id: number, updatePrenotazioniDto: UpdatePrenotazioniDto) {
		return await db.update(prenotazione)
			.set(updatePrenotazioniDto)
			.where(eq(prenotazione.id, id))
			.returning()
	}

	// per cancellare una prenotazione bisogna prima cancellare la riga
	// corrispondente nella tabella prenotazione_utente
	// se la prenotazione non ha più partecipanti, allora si può cancellare
	// anche la riga corrispondente nella tabella prenotazione
	async remove(id_utente: number, id_prenotazione: number) {
		await db.delete(prenotazione_utente)
			.where(and(
				eq(prenotazione_utente.id_utente, id_utente),
				eq(prenotazione_utente.id_prenotazione, id_prenotazione)
			))

		const res = await db.select()
			.from(prenotazione_utente)
			.where(eq(prenotazione_utente.id_prenotazione, id_prenotazione))

		if (res.length == 0) {
			await db.delete(prenotazione)
				.where(eq(prenotazione.id, id_prenotazione))
		}
	}
}

import { Injectable } from '@nestjs/common';
import { CreateRistorantiDto } from './dto/create-ristoranti.dto';
import { UpdateRistorantiDto } from './dto/update-ristoranti.dto';
import { db } from '../db';
import { ristorante } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class RistorantiService {
	async create(createRistorantiDto: CreateRistorantiDto) {
		return await db.insert(ristorante)
			.values(createRistorantiDto)
			.returning()
	}

	async findAll() {
		return await db.select().from(ristorante)
	}

	async findOne(id: number) {
		return await db.select().from(ristorante).where(eq(ristorante.id_ristorante, id))
	}

	async update(id: number, updateRistorantiDto: UpdateRistorantiDto) {
		return await db.update(ristorante)
			.set(updateRistorantiDto)
			.where(eq(ristorante.id_ristorante, id))
			.returning()
	}

	async remove(id: number) {
		return await db.delete(ristorante)
			.where(eq(ristorante.id_ristorante, id))
			.returning()
	}
}

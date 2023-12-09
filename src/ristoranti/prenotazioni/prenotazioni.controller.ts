import { Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrenotazioniService } from './prenotazioni.service';
import { UpdatePrenotazioniDto } from './dto/update-prenotazioni.dto';
import { Api } from '../../decorator/api';

@Api('ristoranti/:id-ristorante/prenotazioni')
export class PrenotazioniController {
	constructor(private readonly prenotazioniService: PrenotazioniService) { }
	@Get()
	async findAll(
		@Param('id-ristorante') id_ristorante: string) {
		return await this.prenotazioniService.findAll(+id_ristorante)
	}

	@Get(':id-prenotazione')
	async findOne(
		@Param('id-ristorante') _: string,
		@Param('id-prenotazione') id_prenotazione: string) {
		return await this.prenotazioniService.findOne(+id_prenotazione)
	}

	@Patch(':id-prenotazione')
	async update(
		@Param('id-ristorante') _: string,
		@Param('id-prenotazione') id_prenotazione: string,
		@Body() updatePrenotazioniDto: UpdatePrenotazioniDto) {
		return await this.prenotazioniService.update(+id_prenotazione, updatePrenotazioniDto)
	}

	@Delete(':id-prenotazione')
	async remove(
		@Param('id-ristorante') _: string,
		@Param('id-prenotazione') id_prenotazione: string) {
		return await this.prenotazioniService.remove(+id_prenotazione)
	}
}

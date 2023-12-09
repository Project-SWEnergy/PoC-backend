import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrenotazioniService } from './prenotazioni.service';
import { CreatePrenotazioniDto } from './dto/create-prenotazioni.dto';
import { UpdatePrenotazioniDto } from './dto/update-prenotazioni.dto';
import { Api } from '../../decorator/api';
import { ApiOperation } from '@nestjs/swagger';

@Api('utenti/:id/prenotazioni')
export class PrenotazioniController {
	constructor(private readonly prenotazioniService: PrenotazioniService) { }

	@ApiOperation({ summary: 'L\'utente id crea una prenotazione' })
	@Post()
	async create(
		@Param('id') id: string,
		@Body() createPrenotazioniDto: CreatePrenotazioniDto) {
		return await this.prenotazioniService.create(+id, createPrenotazioniDto);
	}

	@ApiOperation({ summary: 'L\'utente id visualizza le sue prenotazioni' })
	@Get()
	async findAll(@Param() id: string) {
		return await this.prenotazioniService.findAll(+id);
	}

	@ApiOperation({ summary: 'L\'utente id visualizza la prenotazione id_prenotazione' })
	@Get(':id-prenotazione')
	async findOne(
		@Param('id') _: string,
		@Param('id-prenotazione') id_prenotazione: string
	) {
		return await this.prenotazioniService.findOne(+id_prenotazione);
	}

	@ApiOperation({ summary: 'L\'utente id aggiorna la prenotazione id_prenotazione' })
	@Patch(':id-prenotazione')
	async update(
		@Param('id') _: string,
		@Param('id-prenotazione') id_prenotazione: string,
		@Body() updatePrenotazioniDto: UpdatePrenotazioniDto) {
		return await this.prenotazioniService.update(+id_prenotazione, updatePrenotazioniDto);
	}

	@ApiOperation({ summary: 'L\'utente id elimina la prenotazione id_prenotazione' })
	@Delete(':id-prenotazione')
	async remove(@Param('id') id: string,
		@Param('id-prenotazione') id_prenotazione: string
	) {
		return await this.prenotazioniService.remove(+id, +id_prenotazione);
	}
}

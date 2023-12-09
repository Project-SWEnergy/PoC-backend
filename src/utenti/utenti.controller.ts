import { Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UtentiService } from './utenti.service';
import { CreateUtentiDto } from './dto/create-utenti.dto';
import { UpdateUtentiDto } from './dto/update-utenti.dto';
import { Api } from '../decorator/api';
import { ApiOperation } from '@nestjs/swagger';

@Api('utenti')
export class UtentiController {
	constructor(private readonly utentiService: UtentiService) { }

	@ApiOperation({ summary: 'Crea un utente' })
	@Post()
	async create(@Body() createUtentiDto: CreateUtentiDto) {
		return await this.utentiService.create(createUtentiDto)
	}

	@ApiOperation({ summary: 'Restituisce tutti gli utenti' })
	@Get()
	async findAll() {
		return await this.utentiService.findAll()
	}

	@ApiOperation({ summary: 'Restituisce l\'utente con l\'email indicata' })
	@Get(':email')
	async findOne(@Param('email') email: string) {
		return await this.utentiService.findOne(email)
	}

	@ApiOperation({ summary: 'Aggiorna l\'utente con l\'id indicato' })
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateUtentiDto: UpdateUtentiDto) {
		return await this.utentiService.update(+id, updateUtentiDto)
	}

	@ApiOperation({ summary: 'Elimina l\'utente con l\'id indicato' })
	@Delete(':id')
	@HttpCode(204)
	async remove(@Param('id') id: string) {
		await this.utentiService.remove(+id)
	}
}

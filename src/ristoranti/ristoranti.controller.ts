import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Api } from '../decorator/api';
import { RistorantiService } from './ristoranti.service';
import { CreateRistorantiDto } from './dto/create-ristoranti.dto';
import { UpdateRistorantiDto } from './dto/update-ristoranti.dto';

@Api('ristoranti')
export class RistorantiController {
	constructor(private readonly ristorantiService: RistorantiService) { }

	@ApiOperation({ summary: 'Crea un nuovo ristorante' })
	@Post()
	async create(@Body() createRistorantiDto: CreateRistorantiDto) {
		return await this.ristorantiService.create(createRistorantiDto);
	}

	@ApiOperation({ summary: 'Restituisce tutti i ristoranti' })
	@Get()
	async findAll() {
		return await this.ristorantiService.findAll();
	}

	@ApiOperation({ summary: 'Restituisce un ristorante' })
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.ristorantiService.findOne(+id);
	}

	@ApiOperation({ summary: 'Aggiorna un ristorante' })
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateRistorantiDto: UpdateRistorantiDto) {
		return await this.ristorantiService.update(+id, updateRistorantiDto);
	}

	@ApiOperation({ summary: 'Elimina un ristorante' })
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.ristorantiService.remove(+id);
	}
}

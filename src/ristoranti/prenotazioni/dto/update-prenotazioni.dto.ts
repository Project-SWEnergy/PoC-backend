import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { stato_ordine, CreatePrenotazioniDto } from '../../../utenti/prenotazioni/dto/create-prenotazioni.dto';

export class UpdatePrenotazioniRistoranteDto extends PartialType(CreatePrenotazioniDto) {
	@ApiProperty()
	readonly status: stato_ordine;
}

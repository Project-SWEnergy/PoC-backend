import { PartialType } from '@nestjs/mapped-types';
import { CreatePrenotazioniDto } from './create-prenotazioni.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePrenotazioniDto extends PartialType(CreatePrenotazioniDto) {
	@ApiProperty()
	readonly data_e_ora: Date;
	@ApiProperty()
	readonly numero_persone: number;
}

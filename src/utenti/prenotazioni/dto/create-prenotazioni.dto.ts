import { ApiProperty } from '@nestjs/swagger';

export class CreatePrenotazioniDto {
	@ApiProperty()
	readonly data_e_ora: Date;
	@ApiProperty()
	readonly numero_persone: number;
	@ApiProperty()
	readonly stato: stato_ordine;
	@ApiProperty()
	readonly id_ristorante: number;
}

export enum stato_ordine {
	da_confermare = 'da confermare',
	in_attesa = 'in attesa',
	in_corso = 'in corso',
	councluso = 'concluso'
}

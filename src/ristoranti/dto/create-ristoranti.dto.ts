import { ApiProperty } from '@nestjs/swagger';

export class CreateRistorantiDto {
	@ApiProperty()
	readonly id_ristorante: number;
	@ApiProperty()
	readonly nome: string;
	@ApiProperty()
	readonly indirizzo: string;
}

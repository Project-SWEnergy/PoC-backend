import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateRistorantiDto } from './create-ristoranti.dto';

export class UpdateRistorantiDto extends PartialType(CreateRistorantiDto) {
	@ApiProperty()
	readonly descrizione?: string;
	@ApiProperty()
	readonly telefono?: string;
	@ApiProperty()
	readonly website?: string;
	@ApiProperty()
	readonly costo?: price_enum;
	@ApiProperty()
	readonly sedie_per_bambini?: boolean;
	@ApiProperty()
	readonly adatto_a_disabili?: boolean;
}

export enum price_enum {
	economico = 'economico',
	medio = 'medio',
	costoso = 'costoso',
}

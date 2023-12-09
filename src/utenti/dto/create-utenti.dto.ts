import { ApiProperty } from '@nestjs/swagger';

export class CreateUtentiDto {
	@ApiProperty()
	readonly email: string;
	@ApiProperty()
	readonly username: string;
}

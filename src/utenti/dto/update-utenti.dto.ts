import { PartialType } from '@nestjs/swagger';
import { CreateUtentiDto } from './create-utenti.dto';

export class UpdateUtentiDto extends PartialType(CreateUtentiDto) {}

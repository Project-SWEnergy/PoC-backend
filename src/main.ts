/***
 * @file main.ts
 * # Prima Versione dell'API
 * ## Descrizione
 * Questa è la prima versione dell'API, che verrà utilizzata per il progetto Easy Meal.
 * @version 0.1
 * Sono utilizzati i server di fl0 per il deploy.
 * Nella sezione "/api" è possibile trovare la documentazione dell'API.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const options = new DocumentBuilder()
		.setTitle('Easy Meal')
		.setDescription('The Easy Meal API description')
		.setVersion('0.1')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();

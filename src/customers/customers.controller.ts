import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';

@Controller('customers')
export class CustomersController {

    //Usar QUERY
@Get('query')
rutaQuery(@Query() query) {
  return `El dato query.x ha recibido el valor ${query.x} y el valor de y es: ${query.y}`;
}

@Get('car')
carQuery(@Query('count') carCount: number) {
  return carCount;
}

@Get('cars')
carsQuery(@Query('count', ParseIntPipe) carCount: number) {
  return `carCount: ${carCount}`;
}
}

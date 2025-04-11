import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, Put, Patch } from '@nestjs/common';
import { Customer } from './customers.interface';
import { CustomersService } from './customers.service'; 

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}


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

@Get()
  getAllCustomers(): Customer[] {
    return this.customerService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.customerService.getId(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  createCustomers(
    @Body() body,
  ) {
    this.customerService.insert(body);
    return 'Cliente agregado correctamente';
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) { 
    const idNumber = parseInt(id, 10); 
    return this.customerService.delete(idNumber);
  }
  


  @Put(':id')
update(
  @Param('id') id: number, 
  @Body() body,
) {
  this.customerService.update(id, body);
  return {
    message: `Cliente con ID ${id} se ha modificado correctamente`,
  };
}


  //Decorador PATCH
  @Patch(':id')
partialUpdate(@Param('id') id: number, @Body() body) {
  this.customerService.partialUpdate(id, body);
  return {
    message: `Cliente con ID ${id} fue actualizado parcialmente`,
  };
}

//Destruccion de 2 parametros
@Get(':id/:size')
findWithSize(@Param ('id') id: number, @Param('size') size: string) {
    return `Detalle de producto ${id}, en tamaño ${size}`
}


}
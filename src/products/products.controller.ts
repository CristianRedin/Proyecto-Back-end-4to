import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get('inventario')
    getHelloInProduct(): string{
        return "Estamos en produccion"
    }
//Recibir un pparametro en la URL
//  @Get(':id')
//  find(@Param() params) {
//    return `Estas consultando el producto ${params.id}`
//  }

//Recibir varios parametros en la URL tipados y desagregados
//    @Get(':id/:size')
//    findWithSize (@Param() params){
//        return `productos con id: ${params.id}, tiene el tamaño size: ${params.size}`
// }

//Desestructurar parametros de URL
//    @Get(':id')
//    find(@Param('id') id:number){
//       return `productos con id: ${id}`
//   }

//Destruccion de 2 parametros
    @Get(':id/:size')
    findWithSize(@Param ('id') id: number, @Param('size') size: string) {
        return `Detalle de producto ${id}, en tamaño ${size}`
    }

//Uso de POST
//    @Post()
//    createProduct(){
//        return 'Estamos atendiendo una solicitud  de tipo Post'
//    }

//Recibir datos de POST
//    @Post()
//    createProduct(@Body() body){
//        return `Creo un producto ${body.name} con descripción ${body.description}`
//    }

//Recibir datos Post del body por su nombre
@Post()
createProduct(
  @Body('name') name: string, 
  @Body('description') description: string
) {
  return `Creo el producto ${name} con descripción ${description}.`;
}

//Error 404
@Get('ruta-error-404')
@HttpCode(HttpStatus.NOT_FOUND)
rutaConError404(){
  return 'Esto es un error 404!! no existe'
}

//Decorador RES
@Get(':ide')
find(@Res() response, @Param('id') id:number){
  if(id<100){
    return response.status(HttpStatus.OK).send(`Pagina del producto: ${id}`);
  } else{
    return response.status(HttpStatus.NOT_FOUND).send(`producto inexistente`)
  }
}

//Decorador PUT
@Put(':id')
update(@Param('id') id: number, @Body() body) {
  return `Estás haciendo una operación de actualización del recurso ${id} con ${body.name} y ${body.description}`;
}
  
//Decorador PATCH
@Patch(':id')
partialUpdate(@Param('id') id: number, @Body() body) {
  return `Actualización parcial del ítem ${id}`;
}

//Decorador DELETE
@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
delete(@Param('id') id: number) {
  return `Hemos borrado el producto ${id}`;
}



}

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product/product.interface';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService ){}  

  @Get()
  getAllProducts() {
    return this.productsService.getAll();
  }   
  @Post()
  @HttpCode(201) 
  createProduct(
    @Body('name') name: string,
    @Body('description') description: string
  ) {
    this.productsService.insert({
      id: this.productsService.getAll().length,
      name,
      description,
    });
    return `Creo un producto ${name} con descripción ${description}`;
  }
  

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


//Error 404
@Get('ruta-error-404')
@HttpCode(HttpStatus.NOT_FOUND)
rutaConError404(){
  return 'Esto es un error 404!! no existe'
}

//Decorador RES
@Get('detalle/:id')
  findWithResponse(@Res() response, @Param('id') id: number) {
    if (id < 100) {
      return response
        .status(HttpStatus.OK)
        .send(`Página del producto: ${id}`);
    } else {
      return response  
        .status(HttpStatus.NOT_FOUND)
        .send(`Producto inexistente`);
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

// Buscar por Id
@Get(':id')
getProductById(@Param('id', ParseIntPipe) id: number): Product {
  const product = this.productsService.findById(id);
  if (!product) {
    throw new NotFoundException(`Producto con ID ${id} no encontrado`);
  }
  return product;
}

}



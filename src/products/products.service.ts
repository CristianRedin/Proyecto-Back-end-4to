import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product/product.interface';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
        id: 0,
        name: 'Marco de fotos pequeño',
        description: 'Marco ideal para foto de 10x10'
    },
    {
        id: 1,
        name: 'Marco de fotos Mediano',
        description: 'Marco ideal para foto de 20x20'
    },
    {
        id: 2,
        name: 'Marco de fotos Grande',
        description: 'Marco ideal para foto de 50x40'
    },
    {
        id: 3,
        name: 'Vela aromática',
        description: 'Esta vela lanza ricos olores',
      },
]

getAll() {
    return this.products;
  }
  insert(product) {
    this.products = [
      ...this.products,
      product
    ];
  }
}

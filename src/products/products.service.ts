import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    private products = [
        {
        id: 1,
        name: 'Marco de fotos pequeño',
        description: 'Marco ideal para foto de 10x10'
    },
    {
        id: 2,
        name: 'Marco de fotos Mediano',
        description: 'Marco ideal para foto de 20x20'
    },
    {
        id: 3,
        name: 'Marco de fotos Grande',
        description: 'Marco ideal para foto de 50x40'
    },
    {
        id: 4,
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

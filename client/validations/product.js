import * as Product from '@/validations/schemas/Product';

export const details = {
  name: Product.name,
  image: Product.image,
  categoryId: Product.categoryId,
  manufacturerId: Product.manufacturerId,
  price: Product.price,
  description: Product.description
};

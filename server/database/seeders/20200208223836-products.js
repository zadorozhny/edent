const products = [
  {
    id: 1,
    name: 'Product',
    description: 'Lorem',
    price: 100,
    image: 'https://bit.ly/2QDBhSA',
    isHidden: false,
    manufacturerId: 1
  }
];

const productToCategories = [
  {
    productId: 1,
    categoryId: 1
  },
  {
    productId: 1,
    categoryId: 2
  }
];

export const up = async queryInterface => {
  await queryInterface.bulkInsert('Products', products, {});
  await queryInterface.bulkInsert('ProductToCategories', productToCategories, {});
};

export const down = async queryInterface => {
  await queryInterface.bulkDelete('Products', null, {});
  await queryInterface.bulkDelete('ProductToCategories', null, {});
};

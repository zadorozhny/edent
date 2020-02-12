const products = [
  {
    id: 1,
    name: 'Product1',
    description: 'Lorem',
    model: 'AX123',
    price: 100,
    image: 'https://bit.ly/2QDBhSA',
    isHidden: false,
    manufacturerId: 1
  },
  {
    id: 2,
    name: 'Product2',
    description: 'Lorem',
    model: 'AX123',
    price: 67,
    image: 'https://bit.ly/2QDBhSA',
    isHidden: false,
    manufacturerId: 1
  },
  {
    id: 3,
    name: 'Product3',
    description: 'Lorem',
    model: 'AX123',
    price: 256,
    image: 'https://bit.ly/2QDBhSA',
    isHidden: false,
    manufacturerId: 1
  },
  {
    id: 4,
    name: 'Product4',
    description: 'Lorem',
    model: 'AX123',
    price: 310,
    image: 'https://bit.ly/2QDBhSA',
    isHidden: false,
    manufacturerId: 1
  },
  {
    id: 5,
    name: 'Product5',
    description: 'Lorem',
    model: 'AX123',
    price: 111,
    image: 'https://bit.ly/2QDBhSA',
    isHidden: false,
    manufacturerId: 1
  },
  {
    id: 6,
    name: 'Product6',
    description: 'Lorem',
    model: 'AX123',
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

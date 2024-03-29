const orders = [
  {
    id: 1,
    status: 'pending',
    email: 'napster.pro.ua@gmail.com',
    phone: '+380 (98) 278-4979',
    shipping: 'post',
    city: 'Karkiv',
    fullName: 'Zadorozhnyi A. G.',
    address: '40',
    discount: null,
    userId: null
  }
];

const orderToProducts = [
  {
    orderId: 1,
    productId: 1,
    price: 200,
    count: 1
  }
];

export const up = async queryInterface => {
  await queryInterface.bulkInsert('Orders', orders, {});
  await queryInterface.bulkInsert('OrderToProducts', orderToProducts, {});
};

export const down = async queryInterface => {
  await queryInterface.bulkDelete('Orders', null, {});
  await queryInterface.bulkDelete('OrderToProducts', null, {});
};

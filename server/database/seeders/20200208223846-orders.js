const orders = [
  {
    id: 1,
    status: 'pending',
    email: 'napster.pro.ua@gmail.com',
    phone: '+380982784979',
    name: 'Artem',
    shipping: 'post',
    address: 'Karkiv 40',
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

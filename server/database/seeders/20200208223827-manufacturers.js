const manufacturers = [
  {
    id: 1,
    name: 'Manufacturer'
  }
];

export const up = queryInterface => queryInterface.bulkInsert('Manufacturers', manufacturers, {});

export const down = queryInterface => queryInterface.bulkDelete('Manufacturers', null, {});

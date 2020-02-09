const categories = [
  {
    id: 1,
    name: 'A'
  },
  {
    id: 2,
    name: 'B',
    parentId: 1
  }
];

const categoryToAncestors = [
  {
    categoryId: 2,
    ancestorId: 1
  }
];

export const up = async queryInterface => {
  await queryInterface.bulkInsert('Categories', categories, {});
  await queryInterface.bulkInsert('CategoryToAncestors', categoryToAncestors, {});
};

export const down = async queryInterface => {
  await queryInterface.bulkDelete('Categories', null, {});
  await queryInterface.bulkDelete('CategoryToAncestors', null, {});
};

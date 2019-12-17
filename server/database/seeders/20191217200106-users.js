import Passwords from '@/lib/Passwords';

const { hash, salt } = Passwords.hash('123456');

const users = [
  {
    role: 'admin',
    name: 'Artem',
    email: 'napster.pro.ua@gmail.com',
    phone: '380982784979',
    hash,
    salt
  }
];

export const up = queryInterface => queryInterface.bulkInsert('Users', users, {});

export const down = queryInterface => queryInterface.bulkDelete('Users', null, {});

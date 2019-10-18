export default {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOSTNAME,
  dialect: 'postgres',
  migrationStorage: 'sequelize',
  seederStorage: 'sequelize'
};

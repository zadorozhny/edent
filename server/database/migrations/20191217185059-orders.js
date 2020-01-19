const status = ['pending', 'finished', 'closed'];
const shipping = ['post', 'courier'];

export const up = async (queryInterface, Sequelize) => {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      status: {
        type: Sequelize.ENUM(status),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING
      },
      shipping: {
        type: Sequelize.ENUM(shipping),
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      discount: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }, { transaction });
    await queryInterface.createTable('OrderToProducts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }, { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

export const down = async queryInterface => {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.dropTable('OrderToProducts', { transaction });
    await queryInterface.dropTable('Orders', { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

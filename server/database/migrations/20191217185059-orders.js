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
        allowNull: false,
        defaultValue: status[0]
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      shipping: {
        type: Sequelize.ENUM(shipping),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: true
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
      orderId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Orders',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Products',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false
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

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' // سيحفظ قاعدة البيانات في هذا الملف
  });
  
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
});

// تأكد من أن قاعدة البيانات مُتصلة بشكل صحيح:
sequelize.sync()
  .then(() => {
    console.log("Database synced.");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

module.exports = { User };

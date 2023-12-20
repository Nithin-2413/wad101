const Sequelize = require("sequelize");

const databaseConfig = {
  database: "unique_todo_db",
  username: "unique_user",
  password: "secure_password",
  options: {
    host: "localhost",
    dialect: "postgres",
  },
};

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  databaseConfig.options
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  connect,
  sequelize,
};


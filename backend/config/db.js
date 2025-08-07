import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "qrpay_db",    // database name
  "root",        // username
  "root",        // password
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize; // <-- Use export default instead of module.exports

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event: {
    type: DataTypes.STRING,
  },
  qrCodeData: {
    type: DataTypes.TEXT,
  },
  isAttended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default User;

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Event = sequelize.define("Event", {
  title: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  venue: { type: DataTypes.STRING, allowNull: false },
  banner: { type: DataTypes.STRING, allowNull: false },
});

export default Event;

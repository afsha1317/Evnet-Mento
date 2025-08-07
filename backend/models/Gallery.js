import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Gallery = sequelize.define("Gallery", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Gallery;

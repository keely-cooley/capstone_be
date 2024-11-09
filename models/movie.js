const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class Movie extends Model {}

// Sequelize will create this table if it doesn't exist on startup
Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    released: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    director: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
    }
  },
  {
    sequelize: sequelizeInstance,
    modelName: "movies", //lowercase plural
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Movie;

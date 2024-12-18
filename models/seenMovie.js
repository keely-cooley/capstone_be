const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class SeenMovie extends Model {}

// Sequelize will create this table if it doesn't exist on startup
SeenMovie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "movies",
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "seenMovies", //lowercase plural
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = SeenMovie;

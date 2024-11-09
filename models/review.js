const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class Review extends Model {}

// Sequelize will create this table if it doesn't exist on startup
Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      required: false,
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
    modelName: "reviews", //lowercase plural
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Review;

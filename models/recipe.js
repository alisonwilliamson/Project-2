module.exports = function(sequelize, DataTypes) {
  const Recipe = sequelize.define(
    "Recipe",
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      recipeName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      ingredients: {
        type: DataTypes.STRING(400),
        allowNull: false
      },
      instructions: {
        type: DataTypes.STRING(1200),
        allowNull: false
      },
      cookTime: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      prepTime: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
  return Recipe;
};

module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("users", {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    }, {
      timestamps: false
    });
    return Users;
  };
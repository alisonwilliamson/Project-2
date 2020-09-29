const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/../.env" });

module.exports = {
  development: {
    username: process.env.DEV_USER,
    password: process.env.DEV_PASS,
    database: process.env.DEV_DATA,
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    useEnvVariable: "JAWSDB_URL",
    dialect: "mysql"
  }
};

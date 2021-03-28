module.exports = {
  development: {
    username: "root",
    password: null,
    database: "foodwaysdb",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "jbvkyhartoycuc",
    password: "d87829md9lfl0l",
    database: "d87829md9lfl0l",
    host: "ec2-54-155-87-214.eu-west-1.compute.amazonaws.com",
    // use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
};

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
    password:
      "ebde9d475ebe4bbe841bc811dc7c49a0fef9d0ba90c1c6287e5e078c0c240664",
    database: "d87829md9lfl0l",
    host: "ec2-54-155-87-214.eu-west-1.compute.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    operatorsAliases: '0',
  },
};

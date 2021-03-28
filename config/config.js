module.exports = {
  development: {
    username: "root",
    password: null,
    database: "courseexpress",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
  },
  production: {
    use_env_variable:
      process.env.DATABASE_URL,
    ssl: true,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

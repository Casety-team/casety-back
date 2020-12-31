module.exports = {
  HOST: process.env.database__connection__host || 'localhost',
  PORT: process.env.database__connection__port || '8889',
  USER: process.env.database__connection__user || 'root',
  PASSWORD: process.env.database__connection__password || 'root',
  DB: process.env.database__connection__database || 'casety',
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  } 
};

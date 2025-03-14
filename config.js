module.exports = {
    port: 3000,
    jwtSecret: '!@IU-ETHan8574+_',
    jwtExpirationInSeconds: 3600, // 1 hour
    roles: {
      USER: 'user',
      ADMIN: 'admin'
    },
    bookPriceUnits: {
      DOLLAR: 'dollar',
      EURO: 'euro',
      ZAR: 'rand'
    }
  }
  
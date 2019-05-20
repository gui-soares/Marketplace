const express = require('express')

class App {
  constructor () {
    this.express = express()
    this.isDEV = process.env.NODE_ENV !== 'production'

    this.midlewares()
    this.routes()
  }

  midlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }
}
module.exports = new App().express

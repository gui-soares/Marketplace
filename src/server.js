const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')

class App {
  constructor () {
    this.express = express()
    this.isDEV = process.env.NODE_ENV !== 'production'

    this.database()
    this.midlewares()
    this.routes()
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })

    var db = mongoose.connection

    db.on('error', console.error)
    db.once('open', () => {
      console.log('Connected to MongoDB.')
    })
  }

  midlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }
}
module.exports = new App().express

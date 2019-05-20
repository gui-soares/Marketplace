const server = require('./server')

server.listen(process.env.PORT || 3000)

console.log('Server running on localhost:3000')

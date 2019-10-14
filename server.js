/**
 * {@link https://github.com/typicode/json-server/issues/367#issuecomment-288726795}
 */

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(require('./router')())
const middleware = jsonServer.defaults()

server.use(middleware)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

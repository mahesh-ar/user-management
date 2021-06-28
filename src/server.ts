import errorHandler from 'errorhandler'
import app from './app'
import * as net from 'net'
import config from './../config/config'

/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorHandler())
}

/**
 * Start Express server.
 */
const port = Number(config.PORT ? config.PORT : 3000)
const server = app.listen(port)

server.on('error', err => {
    console.log('Could not start server', err)
    process.exit()
})

server.on('listening', () => {
    const addr = server.address() as net.AddressInfo
    console.log(`Listening on port:${addr.port}`)
    console.log('  Press CTRL-C to stop\n')
})

export default server

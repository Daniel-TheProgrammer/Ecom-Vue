/* @flow */

import Hapi from '@hapi/hapi';
import routes from './Handlers';
import plugins from './Plugins';
import mongoose from 'mongoose';
import consoleTime from 'console-stamp'
import { readFileSync } from 'fs';
import path from 'path';

consoleTime(console, {
  pattern: 'dd/mm/yyyy HH:MM:ss.l',
  colors: {
    stamp: 'yellow'
  }
})

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const server = new Hapi.Server({
  port: 3001,
  routes: {
    validate: {
      failAction: async (request, h, err) => {
        console.log('error')
        console.log(err)
        return h.response(err)
          .takeover()
          .code(err.output.statusCode)
      }
    }
  }
})

const validate = async function (decoded, request) {
  if (decoded.user) {
    return { isValid: true, credentials: decoded.user }
  } else {
    return { isValid: false }
  }
}

async function start () {
  try {
    await server.register(plugins)

    const publicCert = readFileSync(path.resolve(__dirname, './public.pem'))

    server.auth.strategy('jwt', 'jwt', {
      key: publicCert,
      validate,
      verifyOptions: { algorithm: ['RS256'] }
    })

    server.auth.default('jwt')

    await server.start()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

server.route(routes)

start()

const mongoUser = process.env.MONGO_USER || 'user'
const mongoPassword = process.env.MONGO_PASSWORD || 'pass'
const mongoURI = process.env.MONGO_URI || 'localhost:27017'
const mongoDbName = process.env.MONGO_DB || 'db'

mongoose.connect(`mongodb://${mongoUser}:${mongoPassword}@${mongoURI}/${mongoDbName}`)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('tits')
})

/* @flow */
import Good from 'good';
import Inert from '@hapi/inert'
import Vision from 'vision'
import HapiSwagger from 'hapi-swagger'
import AuthJWT2 from 'hapi-auth-jwt2'

const swaggerOptions = {
  schemes: ['http'],
  host: 'localhost:3001',
  info: {
    title: 'Test API Documentation',
    version: '1.0.0'
  }
}

const goodOptions = {
  reporters: {
    myConsoleReporter: [
      {
        module: 'good-console'
      },
      'stdout'
    ]
  }
};

const plugins = [
  AuthJWT2,
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: swaggerOptions
  },
  {
    plugin: Good,
    options: goodOptions
  }
]

export default plugins;

/* @flow */
import GetUser from './GetUser'
import UpdateUser from './UpdateUser'
import Joi from 'joi'

const routes = [
  {
    method: 'GET',
    path: '/User/GetUser/{id}',
    handler: GetUser,
    config: {
      cors: true,
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/User/UpdateUser/{id}',
    handler: UpdateUser,
    config: {
      cors: true,
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string()
        },
        payload: {
          firstName: Joi.string(),
          lastName: Joi.string()
        }
      }
    }
  }
];

export default routes

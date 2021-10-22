/* @flow */

import CheckUsernameAvailability from './CheckUsernameAvailability';
import SendNewVerifyEmail from './SendNewVerifyEmail'
import ManualSignup from './ManualSignup';
import Joi from 'joi'

const routes = [
  {
    method: 'POST',
    path: '/Signup/CheckUsernameAvailability',
    handler: CheckUsernameAvailability,
    config: {
      auth: false,
      cors: true,
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().email().required()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/Signup/SendNewVerifyEmail',
    handler: SendNewVerifyEmail,
    config: {
      cors: true,
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().email().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/Signup/ManualSignup',
    handler: ManualSignup,
    config: {
      auth: false,
      cors: true,
      tags: ['api'], // THIS IS FOR HAPISWAGGER
      validate: {
        payload: {
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          email: Joi.string().email().required(),
          hashedPassword: Joi.string()
            .required()
        }
      }
    }
  }
];

export default routes;

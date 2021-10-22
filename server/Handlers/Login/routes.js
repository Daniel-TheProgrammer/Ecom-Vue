import Joi from 'joi'
import ManualLogin from './ManualLogin';
import VerifyEmail from './VerifyEmail';
import SignOut from './SignOut';

const routes = [
  {
    method: 'POST',
    path: '/Login/ManualLogin',
    handler: ManualLogin,
    config: {
      auth: false,
      cors: true,
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().email(),
          password: Joi.string(),
          refreshToken: Joi.string(),
          user: Joi.string()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/Login/VerifyEmail',
    handler: VerifyEmail,
    config: {
      cors: true,
      tags: ['api'],
      validate: {
        query: {
          email: Joi.string().email().required(),
          key: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/signout',
    handler: SignOut,
    config: {
      cors: true,
      tags: ['api'],
      validate: {
        payload: {
          refreshToken: Joi.string()
        }
      }
    }
  }
];

export default routes;

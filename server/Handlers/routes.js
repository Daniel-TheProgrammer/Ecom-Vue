/* @flow */

import LoginRoutes from './Login'
import SignupRoutes from './Signup'
import UserRoutes from './User'

const routes = [
  ...LoginRoutes,
  ...SignupRoutes,
  ...UserRoutes
]

export default routes

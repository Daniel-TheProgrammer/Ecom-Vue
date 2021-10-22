/* @flow */

import mongoose, { Schema } from 'mongoose'
import shortid from 'shortid'

const authSchema = new Schema({
  email: { type: String, index: true },
  hashedPassword: String,
  emailVerified: { type: Boolean, default: false },
  emailVerifiedKey: { type: String, default: shortid.generate },
  creationDate: { type: Date, default: Date.now },
  refreshTokens: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Auth = mongoose.model('Auth', authSchema)

export default Auth

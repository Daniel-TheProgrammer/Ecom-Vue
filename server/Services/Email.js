import sgMail from '@sendgrid/mail'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function VerifyEmail (to, key) {
  const url = `http://localhost:3001/Login/VerifyEmail?email=${to}&key=${encodeURI(key)}`

  const msg = {
    to: 'dan@dabb.io',
    from: 'service@authapi.com',
    subject: 'Validate your email',
    text: `Copy and paste this url into your web browser: ${url}`,
    html: `<a href="${url}">Click to verify</a>`
  }

  return sgMail.send(msg)
}

import Client from 'shopify-buy'

const client = Client.buildClient({
  domain: 'liosis.myshopify.com',
  storefrontAccessToken: '941adf52f51c43ed0a21414db77cb579'
})

export default client

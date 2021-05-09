# Vue Storefront Demo clone  
This is only the front-end part of the site. In some places, I thought I needed to do it differently and better.  
  
Since there is no backend, I only used local storage to store the data.
There is no catching errors in requests, because, in theory, they should be caught in the axios interceptor, but i implemented test version for cart add/remove item.
Of course, everything is simplified and static data is supplied, but it's can be easily impoved by adding API requests in Vuex instead of mock promises and timeouts
  
Insipred by https://demo.vuestorefront.io/  
  
![gif](example.gif)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

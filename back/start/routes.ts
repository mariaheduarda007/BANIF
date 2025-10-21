import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/hello', async () => {
  return {
    message: 'API AdonisJS com Autenticação por Access Tokens',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
        logout: 'POST /auth/logout (protegida)',
        me: 'GET /auth/me (protegida)',
        tokens: 'GET /auth/tokens (protegida)',
        createToken: 'POST /auth/tokens (protegida)',
      },
      protected: {
        profile: 'GET /profile (protegida)',
        dashboard: 'GET /dashboard (protegida)',
        posts: 'GET /posts (protegida)',
        createPost: 'POST /posts (protegida)',
      },
    },
  }
})

router
  .group(() => {
    // públicas
    router.post('/register', '#controllers/auth_controller.register')
    router.post('/login', '#controllers/auth_controller.login')
    router.get('/listClients', '#controllers/clients_controller.index')
    // start/routes.ts
    
  })
  .prefix('/auth')
  
  // protegidas
  router
  .group(() => {
    router.post('/tokens', '#controllers/auth_controller.createToken')
    router.get('/tokens', '#controllers/auth_controller.tokens')
    router.get('/me/:id?', '#controllers/auth_controller.me')
    router.get('/users/:id/address', '#controllers/auth_controller.getUserAddress')
    router.get('/viewAccount/:id?', '#controllers/clients_controller.viewAccount')
    router.post('/transaction', '#controllers/clients_controller.transaction')
    router.get('/statement/:id?', '#controllers/statement_controller.index')
    // router.get('/statement', '#controllers/statement_controller.store')
    router.post('/logout', '#controllers/auth_controller.logout')
  })
  .prefix('/auth')
  .use(middleware.auth())

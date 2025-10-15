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

// Rotas de autenticação (públicas)
router
  .group(() => {
    // públicas
    router.post('/register', '#controllers/auth_controller.register')
    router.post('/login', '#controllers/auth_controller.login')
    // start/routes.ts

  })
  .prefix('/auth')

// protegidas
router
  .group(() => {
    router.post('/logout', '#controllers/auth_controller.logout')
    router.get('/me', '#controllers/auth_controller.me')
    router.get('/tokens', '#controllers/auth_controller.tokens')
    router.post('/tokens', '#controllers/auth_controller.createToken')
    router.get('/transaction', '#controllers/transaction_controller.index')
    router.get('/transaction', '#controllers/transaction_controller.store')

  })
  .prefix('/auth')
  .use(middleware.auth())

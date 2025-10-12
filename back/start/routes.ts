import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.resource('cursos', '#controllers/cursos_controller')
}).use([middleware.auth()])

router.group(() => {
  router.resource('disciplinas', '#controllers/disciplinas_controller')
}).use([middleware.auth()])

router.group(() => {
  router.resource('alunos', '#controllers/alunos_controller')
}).use([middleware.auth()])

// Matrículas
router.group(() => {
  router.get('matriculas', '#controllers/matriculas_controller.index')
  router.get('matriculas/create', '#controllers/matriculas_controller.create')
  router.post('matriculas', '#controllers/matriculas_controller.store')
  router.delete('matriculas/:alunoId/:disciplinaId', '#controllers/matriculas_controller.destroy')
}).use([middleware.auth()])

// Rota pública boas-vindas / autenticação
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
        createToken: 'POST /auth/tokens (protegida)'
      },
      protected: {
        profile: 'GET /profile (protegida)',
        dashboard: 'GET /dashboard (protegida)',
        posts: 'GET /posts (protegida)',
        createPost: 'POST /posts (protegida)'
      },
    },
  }
})

// Rotas de autenticação (públicas)
router.group(() => {
  router.post('/register', '#controllers/auth_controller.register')
  router.post('/login', '#controllers/auth_controller.login')
  // Rotas protegidas de autenticação
  router.post('/logout', '#controllers/auth_controller.logout').use(middleware.auth())
  router.get('/me', '#controllers/auth_controller.me').use(middleware.auth())
  router.get('/tokens', '#controllers/auth_controller.tokens').use(middleware.auth())
  router.post('/tokens', '#controllers/auth_controller.createToken').use(middleware.auth())
}).prefix('/auth')

// import type { HttpContext } from '@adonisjs/core/http'
// import StatementPolicy from '#policies/statement_policy'
// import Statement from '#models/statement'

// export default class StatementController {
 
//   async store({ request, response, auth, bouncer }: HttpContext) {
//     // const payload = await request.validateUsing(createAluno)
//     try {
//       // Usuário Autenticado
//       const user = auth.getUserOrFail()
//       // Verificar se o usuário pode listar posts
//       if (await bouncer.with(TransactionPolicy).denies('create')) {
//         return response.forbidden({ message: 'Você não tem permissão para criar alunos' })
//       }

//       const transaction = await Transaction.create({
//         ...payload,
//       })
//       return response.status(201).json({
//         message: 'OK',
//         data: aluno,
//       })
//     } catch (error) {
//       return response.status(500).json({
//         message: 'ERROR',
//       })
//     }
//   }

// }

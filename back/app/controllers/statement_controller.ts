import type { HttpContext } from '@adonisjs/core/http'
import StatementPolicy from '#policies/statement_policy'
import Statement from '#models/statement'
import Account from '#models/account'
import User from '#models/user'

export default class StatementController {
  async index({ auth, response, bouncer, params, request }: HttpContext) {
    try {
      const loggedUser = await auth.getUserOrFail()
      if (await bouncer.with(StatementPolicy).denies('list')) {
        return response.forbidden({ message: 'Sem permissão' })
      }
      //se for o gerente 
      if (loggedUser.id_role_fk === 1 && params.id) {
        const client = await User.find(params.id)

        if (!client) {
          return response.notFound({
            message: 'Cliente não encontrado.',
          })
        }

        await client.load('account')
        const accountNumber = client.account.account_number

        const statement = await Statement.query().where('account_number_fk', accountNumber)
        return response.ok({
          message: 'OK',
          data: statement.map((t) => ({
            ...t.toJSON(),
            created_at: t.createdAt?.toFormat('dd/MM/yyyy HH:mm'),
          })),
        })
      } else { //se for o cliente 
        await loggedUser.load('account')
        console.log("AAAAAAAAAA" + loggedUser.account.account_number)
        const statement = await Statement.query().where(
          'account_number_fk',
          loggedUser.account.account_number
        )
        return response.ok({
          message: 'OK',
          data: statement.map((t) => ({
            ...t.toJSON(),
            created_at: t.createdAt?.toFormat('dd/MM/yyyy HH:mm'),
          })),
        })
      }
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  // async store({ request, response, auth, bouncer }: HttpContext) {
  //   // const payload = await request.validateUsing(createAluno)
  //   try {
  //     // Usuário Autenticado
  //     const user = auth.getUserOrFail()
  //     // Verificar se o usuário pode listar posts
  //     if (await bouncer.with(TransactionPolicy).denies('create')) {
  //       return response.forbidden({ message: 'Você não tem permissão para criar alunos' })
  //     }

  //     const transaction = await Transaction.create({
  //       ...payload,
  //     })
  //     return response.status(201).json({
  //       message: 'OK',
  //       data: aluno,
  //     })
  //   } catch (error) {
  //     return response.status(500).json({
  //       message: 'ERROR',
  //     })
  //   }
  // }
}

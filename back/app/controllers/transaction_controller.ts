import type { HttpContext } from '@adonisjs/core/http'
import TransactionPolicy from '#policies/transaction_policy'
import Transaction from '#models/transaction'

export default class TransactionController {
  async index({ auth, response, bouncer }: HttpContext) {
    try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(TransactionPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar transações' })
      }

      const transactions = await Transaction.query().where('id_user_fk', user.id)

      return response.status(200).json({
        message: 'OK',
        data: transactions.map((t) => ({
          ...t.toJSON(),
          created_at: t.createdAt?.toFormat('dd/MM/yyyy HH:mm'),
        })),
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
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

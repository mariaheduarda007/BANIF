import type { HttpContext } from '@adonisjs/core/http'
// import { permissions } from '../utils/permissions.js'
import TransactionPolicy from '#policies/transaction_policy'
import Transaction from '#models/transaction'

export default class AuthController {
  async index({ auth, bouncer, response }: HttpContext) {
    try {

      const user = auth.getUserOrFail()

      if (await bouncer.with(TransactionPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar transações' })
      }

      const transactions = await Transaction.query().where('user_id', user.id)

      return response.status(200).json({
        message: 'OK',
        data: transactions,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
    }
  }
}

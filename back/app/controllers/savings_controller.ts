import type { HttpContext } from '@adonisjs/core/http'
import SavingsPolicy from '#policies/savings_policy'
import Savings from '#models/savings'
import { createSavings } from '#validators/savings'
import Account from '#models/account'

export default class SavingsController {
  async store({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createSavings)
    try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(SavingsPolicy).denies('create')) {
        return response.forbidden({
          message: 'Você não tem permissão para realizar uma transação para Poupança',
        })
      }

      const savings = await Savings.create({
        ...payload,
      })
      return response.status(201).json({
        message: 'OK',
        data: savings,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
        details: error.message,
      })
    }
  }

  async get({ auth, response, bouncer }: HttpContext) {
    try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(SavingsPolicy).denies('get')) {
        return response.forbidden({
          message: 'Você não tem permissão para resgatar uma quantia da Poupança',
        })
      }

      const account = await Account.query().where('id_user_fk', user.id)

      if (!account || account.length === 0) {
        console.log(user.id)
        return response.status(404).json({ message: 'Conta não encontrada' })
      }

      const account_number = account[0].account_number

      const savings = await Savings.query().where('account_number_fk', account_number)

      return response.status(200).json({
        message: 'OK',
        data: savings,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
    }
  }
}

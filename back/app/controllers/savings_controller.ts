import type { HttpContext } from '@adonisjs/core/http'
import SavingsPolicy from '#policies/savings_policy'
import Savings from '#models/savings'
import { updateSavings } from '#validators/savings'
import Account from '#models/account'

export default class SavingsController {
  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateSavings)
    try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(SavingsPolicy).denies('update')) {
        return response.forbidden({
          message: 'Você não tem permissão para realizar uma transação para Poupança',
        })
      }

      const account = await Account.query().where('account_number', params.id).firstOrFail()

      if (account.balance < payload.value) {
        return response.forbidden({
          message: 'Você não tem saldo suficiente para realizar uma transação para Poupança',
        })
      }
      account.balance -= payload.value
      await account.save()

      const savings = await Savings.query().where('account_number_fk', params.id).firstOrFail()
      savings.value += payload.value
      await savings.save()

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

  async get({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateSavings)
    try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(SavingsPolicy).denies('update')) {
        return response.forbidden({
          message: 'Você não tem permissão para resgatar uma quantia da Poupança',
        })
      }

      const account = await Account.query().where('account_number', params.id).firstOrFail()
      const savings = await Savings.query().where('account_number_fk', params.id).firstOrFail()

      if (payload.value > savings.value) {
        return response.forbidden({
          message: 'O valor informado é maior que o saldo em Poupança',
        })
      }

      savings.value -= payload.value
      await savings.save()

      account.balance += payload.value
      await account.save()

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
}

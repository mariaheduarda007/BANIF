import type { HttpContext } from '@adonisjs/core/http'
import InvestmentsPolicy from '#policies/investments_policy'
import Investments from '#models/investments'
import { updateInvestments } from '#validators/investments'
import Account from '#models/account'

export default class SavingsController {
  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateInvestments)
    try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(InvestmentsPolicy).denies('update')) {
        return response.forbidden({
          message: 'Você não tem permissão para realizar uma transação para Investimentos',
        })
      }

      const account = await Account.query().where('account_number', params.id).firstOrFail()

      if (account.balance < payload.value) {
        return response.forbidden({
          message: 'Você não tem saldo suficiente para realizar uma transação para Investimentos',
        })
      }
      account.balance -= payload.value
      await account.save()

      const investments = await Investments.query()
        .where('account_number_fk', params.id)
        .firstOrFail()
      investments.value += payload.value
      await investments.save()

      return response.status(201).json({
        message: 'OK',
        data: investments,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
        details: error.message,
      })
    }
  }

  async get({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateInvestments)
    try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(InvestmentsPolicy).denies('update')) {
        return response.forbidden({
          message: 'Você não tem permissão para resgatar uma quantia da Investimentos',
        })
      }

      const account = await Account.query().where('account_number', params.id).firstOrFail()
      const investments = await Investments.query()
        .where('account_number_fk', params.id)
        .firstOrFail()

      if (payload.value > investments.value) {
        return response.forbidden({
          message: 'O valor informado é maior que o saldo em Investimentos',
        })
      }

      investments.value -= payload.value
      await investments.save()

      account.balance += payload.value
      await account.save()

      return response.status(201).json({
        message: 'OK',
        data: investments,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
        details: error.message,
      })
    }
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import SavingsPolicy from '#policies/savings_policy'
import Savings from '#models/savings'
import { updateSavings } from '#validators/savings'
import Account from '#models/account'
import Statement from '#models/statement'

export default class SavingsController {
  async update({ params, request, response, auth, bouncer }: HttpContext) {
    let payload
    try {
      payload = await request.validateUsing(updateSavings)
    } catch (error) {
      return response.status(422).json({
        status: 'error',
        message: 'Valor inválido. Digite novamente!',
        error: error.message,
      })
    }

    try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(SavingsPolicy).denies('update')) {
        return response.forbidden({
          message: 'Você não tem permissão para realizar uma transação para Poupança',
        })
      }

      if (payload.value === 0) {
        return response.forbidden({
          message: 'Você ainda não digitou um valor ',
        })
      }

      if (!(await Account.query().where('account_number', params.id).first())) {
        return response.forbidden({
          message: 'Conta não encontrada. Digite novamente!',
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

      Statement.create({
        account_number_fk: params.id,
        value: payload.value,
        type: false,
        origin: 'Poupança',
      })

      return response.status(201).json({
        message: 'OK',
        data: savings,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro',
        details: error.message,
      })
    }
  }

  async get({ params, request, response, auth, bouncer }: HttpContext) {
    let payload
    try {
      payload = await request.validateUsing(updateSavings)
    } catch (error) {
      return response.status(422).json({
        status: 'error',
        message: 'Valor inválido. Digite novamente!',
        error: error.message,
      })
    }
    try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(SavingsPolicy).denies('update')) {
        return response.forbidden({
          message: 'Você não tem permissão para resgatar uma quantia da Poupança',
        })
      }

      if (!(await Account.query().where('account_number', params.id).first())) {
        return response.forbidden({
          message: 'Conta não encontrada. Digite novamente!',
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

      Statement.create({
        account_number_fk: params.id,
        value: payload.value,
        type: true,
        origin: 'Poupança',
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
}

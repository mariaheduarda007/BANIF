import type { HttpContext } from '@adonisjs/core/http'
import SavingsPolicy from '#policies/savings_policy'
import Savings from '#models/savings'
import { updateSavings } from '#validators/savings'
import Account from '#models/account'
import Statement from '#models/statement'
import User from '#models/user'

export default class SavingsController {
  async update({ params, request, response, auth, bouncer }: HttpContext) {
    // let payload

    // try {
    //   payload = await request.validateUsing(updateSavings)
    // } catch (error) {
    //   return response.status(422).json({
    //     status: 'error',
    //     message: 'Valor inválido. Digite novamente!',
    //     error: error.details,
    //   })
    // }

    try {
      const loggedUser = auth.getUserOrFail()
      let { id, accountNumber, value } = request.only(['id', 'accountNumber', 'value'])

      if (await bouncer.with(SavingsPolicy).denies('update')) {
        return response.forbidden({
          message: 'Você não tem permissão para realizar uma transação para Poupança',
        })
      }

      

      //se for o usuario
      if (id == undefined || accountNumber == undefined) {
        let loggedUserAccount = await Account.query().where('user_id_fk', loggedUser.id).first()
        if (!loggedUserAccount) {
          return response.badRequest({ message: 'Conta do usuário não encontrada.' })
        }

        id = loggedUserAccount?.user_id_fk
        accountNumber = loggedUserAccount?.account_number
      }

      //verificacoes
      console.log(value)
      const amount = Number(value)
       if (amount < 0) {
        return response.forbidden({
          message: 'Valor inválido!',
        })
      }
      if (amount === 0) {
        return response.forbidden({
          message: 'Você ainda não digitou um valor ',
        })
      }
      if (!(await Account.query().where('user_id_fk', id).first())) {
        return response.forbidden({
          message: 'Conta não encontrada. Digite novamente!',
        })
      }

      const account = await Account.query().where('account_number', accountNumber).firstOrFail()

      if (account.balance < amount) {
        return response.forbidden({
          message: 'Você não tem saldo suficiente para realizar uma transação para Poupança',
        })
      }
      account.balance -= amount
      await account.save()

      const savings = await Savings.query().where('account_number_fk', accountNumber).firstOrFail()
      savings.value += amount
      await savings.save()

      Statement.create({
        account_number_fk: accountNumber,
        value: amount,
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
    // let payload
    // try {
    //   payload = await request.validateUsing(updateSavings)
    // } catch (error) {
    //   return response.status(422).json({
    //     status: 'error',
    //     message: 'Valor inválido. Digite novamente!',
    //     error: error.message,
    //   })
    // }
    try {
      const loggedUser = auth.getUserOrFail()
      let { id, accountNumber, value } = request.only(['id', 'accountNumber', 'value'])

      if (await bouncer.with(SavingsPolicy).denies('update')) {
        return response.forbidden({
          message: 'Você não tem permissão para resgatar uma quantia da Poupança',
        })
      }

      //se for o usuario
      if (id == undefined || accountNumber == undefined) {
        let loggedUserAccount = await Account.query().where('user_id_fk', loggedUser.id).first()
        if (!loggedUserAccount) {
          return response.badRequest({ message: 'Conta do usuário não encontrada.' })
        }

        id = loggedUserAccount?.user_id_fk
        accountNumber = loggedUserAccount?.account_number
      }

      //verificacoes
      console.log(value)
      const amount = Number(value)
       if (amount < 0) {
        return response.forbidden({
          message: 'Valor inválido!',
        })
      }
      if (amount === 0) {
        return response.forbidden({
          message: 'Você ainda não digitou um valor ',
        })
      }
      if (!(await Account.query().where('user_id_fk', id).first())) {
        return response.forbidden({
          message: 'Conta não encontrada. Digite novamente!',
        })
      }

      const savings = await Savings.query().where('account_number_fk', accountNumber).firstOrFail()

      if (amount > savings.value) {
        return response.forbidden({
          message: 'O valor informado é maior que o saldo em Poupança',
        })
      }
      savings.value -= amount
      await savings.save()

      const account = await Account.query().where('account_number', accountNumber).firstOrFail()
      account.balance += amount
      await account.save()

      Statement.create({
        account_number_fk: accountNumber,
        value: amount,
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
}

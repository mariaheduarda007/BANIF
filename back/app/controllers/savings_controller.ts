import type { HttpContext } from '@adonisjs/core/http'
import SavingsPolicy from '#policies/savings_policy'
import Savings from '#models/savings'
import { createSavings } from '#validators/savings'

export default class SavingsController {
  
  async store({ request, response, auth, bouncer }: HttpContext) {
      const payload = await request.validateUsing(createSavings)
      try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(SavingsPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para realizar uma transação para Poupança' })
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
      })
    }
  }

  // async get({ auth, response, bouncer }: HttpContext) {
  //   try {
  //     const user = auth.getUserOrFail()

  //     if (await bouncer.with(SavingsPolicy).denies('get')) {
  //       return response.forbidden({ message: 'Você não tem permissão para realizar uma transação para Poupança' })
  //     }

  //     const savings = await Savings.query().where('id_user_fk', user.id)

  //     return response.status(200).json({
  //       message: 'OK',
  //       data: savings,
  //     })
  //   } catch (error) {
  //     return response.status(500).json({
  //       message: 'ERROR',
  //     })
  //   }
  // }
}

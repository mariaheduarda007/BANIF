import type { HttpContext } from '@adonisjs/core/http'
import InvestmentsPolicy from '#policies/investments_policy'
import Investments from '#models/investments'
import { createInvestments } from '#validators/investments'

export default class SavingsController {
  
  async store({ request, response, auth, bouncer }: HttpContext) {
      const payload = await request.validateUsing(createInvestments)
      try {
      const user = auth.getUserOrFail()

      if (await bouncer.with(InvestmentsPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para realizar um Investimento' })
      }

      const investments = await Investments.create({
        ...payload,
      })
      return response.status(201).json({
        message: 'OK',
        data: investments,
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

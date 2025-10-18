import type { HttpContext } from '@adonisjs/core/http'
import ClientPolicy from '#policies/client_policy'
import User from '#models/user'
import Account from '#models/account'

export default class ClientsController {
  async index({ auth, response, bouncer }: HttpContext) {
    try {
      //   const user = await auth.getUserOrFail()

      //   if (await bouncer.with(ClientPolicy).denies('list')) {
      //     return response.forbidden({ message: 'Você não tem permissão para listar clientes' })
      //   }

      const clients = await User.query()
        .whereNot('id_role_fk', 1)
        .whereExists((builder) => {
          builder.select('*').from('account').whereRaw('account.user_id_fk = users.id')
        })
        .preload('account')

      return response.ok({
        message: 'OK',
        data: clients.map((client) => ({
          id: client.id,
          name: client.name,
          email: client.email,
          cpf: client.cpf,
          account: client.account,
        })),
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro ao listar clientes',
        error: error.message,
      })
    }
  }
  async viewAccount({ auth, response, bouncer }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(ClientPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver dados da conta' })
      }

      await user.load('account')

      return response.ok({
        message: 'OK',
        data: {
          accountNumber: user.account?.account_number,
          agencyNumber: user.account?.agency_number,
          balance: user.account?.balance,
        },
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro ao visualizar dados da conta',
        error: error.message,
      })
    }
  }
}

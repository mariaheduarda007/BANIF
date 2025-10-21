import type { HttpContext } from '@adonisjs/core/http'
import ClientPolicy from '#policies/client_policy'
import User from '#models/user'
import Account from '#models/account'
import Transaction from '#models/transaction'
import Statement from '#models/statement'

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
  async viewAccount({ auth, response, bouncer, params }: HttpContext) {
    try {
      const loggedUser = await auth.getUserOrFail()

      // if (await bouncer.with(ClientPolicy).denies('view')) {
      //   return response.forbidden({ message: 'Você não tem permissão para ver dados da conta' })
      // }

      // se for gerente e um id for passado, ele pode ver outro cliente
      if (loggedUser.id_role_fk === 1 && params.id) {
        const client = await User.find(params.id)

        if (!client) {
          return response.notFound({
            message: 'Cliente não encontrado.',
          })
        }

        await client.load('account')

        return response.ok({
          message: 'OK',
          data: {
            accountNumber: client.account?.account_number,
            agencyNumber: client.account?.agency_number,
            balance: client.account?.balance,
          },
        })
      }
      await loggedUser.load('account')
      return response.ok({
        message: 'OK',
        data: {
          accountNumber: loggedUser.account?.account_number,
          agencyNumber: loggedUser.account?.agency_number,
          balance: loggedUser.account?.balance,
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
  async transaction({ auth, request, response }: HttpContext) {
    try {
      const loggedUser = await auth.getUserOrFail()

      let {
        agencyNumberMakingTransfer,
        accountNumberMakingTransfer,
        agencyNumberReceivingTransfer,
        accountNumberReceivingTransfer,
        value,
      } = request.only([
        'agencyNumberMakingTransfer',
        'accountNumberMakingTransfer',
        'agencyNumberReceivingTransfer',
        'accountNumberReceivingTransfer',
        'value',
      ])

      // se nao for passada a conta que ta fazendo a transferencia, assume a do loggedUser
      if (agencyNumberMakingTransfer == undefined || accountNumberMakingTransfer == undefined) {
        let loggedUserAccount = await Account.query().where('user_id_fk', loggedUser.id).first()
        if (!loggedUserAccount) {
          return response.badRequest({ message: 'Conta do usuário não encontrada.' })
        }

        agencyNumberMakingTransfer = loggedUserAccount?.agency_number
        accountNumberMakingTransfer = loggedUserAccount?.account_number
      }

      // busca as contas no banco
      const accountFrom = await Account.query()
        .where('agency_number', agencyNumberMakingTransfer)
        .where('account_number', accountNumberMakingTransfer)
        .first()

      const accountTo = await Account.query()
        .where('agency_number', agencyNumberReceivingTransfer)
        .where('account_number', accountNumberReceivingTransfer)
        .first()

      // validaçoes basicas
      if (!accountFrom || !accountTo) {
        return response.badRequest({
          message: 'Conta de origem ou destino não encontrada.',
        })
      }
      if (value <= 0 || isNaN(Number(value))) {
        return response.badRequest({
          message: 'Determine um valor válido.',
        })
      }
      //converte o valor
      const amount = Number(value)

      if (accountFrom.balance < amount) {
        return response.badRequest({
          message: 'Saldo insuficiente.',
        })
      }
      // realiza a transferencia
      accountFrom.balance = Number(accountFrom.balance) - amount
      await accountFrom.save()
      accountTo.balance = Number(accountTo.balance) + amount
      await accountTo.save()

      // salva um registro na transaction
      await Transaction.create({
        value,
        account_number_sender: accountFrom.account_number,
        account_number_recipient: accountTo.account_number,
      })
    
      // salva um registro no statement
      await Statement.create({
        value,
        type: true, // recebeu
        origin: `Transferência recebida de ${accountFrom.account_number}`,
        account_number_fk: accountTo.account_number,
      })
      await Statement.create({
        value,
        type: false, // deu
        origin: `Transferência enviada para ${accountTo.account_number}`,
        account_number_fk: accountFrom.account_number,
      })
      //id	value	type	origin	account_number_fk	created_at	

      return response.ok({
        message: 'Transferência realizada com sucesso!',
        data: {
          from: {
            agency: agencyNumberMakingTransfer,
            account: accountNumberMakingTransfer,
            newBalance: accountFrom.balance,
          },
          to: {
            agency: agencyNumberReceivingTransfer,
            account: accountNumberReceivingTransfer,
            newBalance: accountTo.balance,
          },
        },
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro ao tentar realizar a transação.',
        error: error.message,
      })
    }
  }
}

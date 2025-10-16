import type { HttpContext } from '@adonisjs/core/http'
import StatementPolicy from '#policies/statement_policy'
import Statement from '#models/statement'
import Account from '#models/account'

export default class StatementController {

    async index({ auth, response, bouncer }: HttpContext) {
        try {
            const user = auth.getUserOrFail()

            if (await bouncer.with(StatementPolicy).denies('list')) {
                return response.forbidden({ message: 'Você não tem permissão para listar extrato' })
            }

            const account = await Account.query().where('id_user_fk', user.id)
            account.

           // const statement = await Statement.query().where('account_number_fk', )

            return response.status(200).json({
                /* message: 'OK',
                data: statement.map((t) => ({
                    ...t.toJSON(),
                    created_at: t.createdAt?.toFormat('dd/MM/yyyy HH:mm'),
                })), */
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    /* async store({ request, response, auth, bouncer }: HttpContext) {
        // const payload = await request.validateUsing(createAluno)
        try {
            // Usuário Autenticado
            const user = auth.getUserOrFail()
            // Verificar se o usuário pode listar posts
            if (await bouncer.with(TransactionPolicy).denies('create')) {
                return response.forbidden({ message: 'Você não tem permissão para criar alunos' })
            }

            const transaction = await Transaction.create({
                ...payload,
            })
            return response.status(201).json({
                message: 'OK',
                data: aluno,
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }
 */
}

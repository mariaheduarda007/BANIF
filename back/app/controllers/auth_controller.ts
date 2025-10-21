import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import { permissions } from '../utils/permissions.js'
import logger from '@adonisjs/core/services/logger'
import Address from '#models/address'
import Account from '#models/account'
import Savings from '#models/savings'
import Investments from '#models/investments'
import ClientPolicy from '#policies/client_policy'

export default class AuthController {
  async register({ request, response, bouncer}: HttpContext) {
    if (await bouncer.with(ClientPolicy).denies('list')) {
      return response.forbidden({ message: 'Você não tem permissão para listar clientes' })
    }
    try {
      const payload = await request.validateUsing(registerValidator)
      const user = await User.create({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        cpf: payload.cpf,
      })

      await Address.create({
        street: payload.address.street,
        neighborhood: payload.address.neighborhood,
        house_number: payload.address.house_number,
        city: payload.address.city,
        state: payload.address.state,
        user_id_fk: user.id,
      })

      await Account.create({
        account_number: payload.account.account_number,
        agency_number: payload.account.agency_number,
        balance: 0,
        user_id_fk: user.id,
      })

      await Savings.create({
        value: 0,
        account_number_fk: payload.account.account_number,
      })

      await Investments.create({
        value: 0,
        account_number_fk: payload.account.account_number,
      })

      const token = await User.accessTokens.create(user, ['*'], {
        name: 'Registration Token',
        expiresIn: '30 days',
      })
      return response.created({
        message: 'Usuário registrado com sucesso',
        user: {
          cpf: user.cpf,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        token: {
          type: 'bearer',
          value: token.value!.release(),
          expiresAt: token.expiresAt,
        },
      })
    } catch (error) {
      return response.badRequest({
        message: 'Erro ao registrar usuário',
        errors: error.messages || error.message,
      })
    }
  }
  /**
   * Fazer login do usuário
   */
  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(email, password)
      logger.info(user)

      const token = await User.accessTokens.create(user, ['*'], {
        name: 'Login Token',
        expiresIn: '30 days',
      })
      logger.info('token')
      return response.ok({
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          cpf: user.cpf,
          name: user.name,
          email: user.email,
          id_role_fk: user.id_role_fk,
        },
        token: {
          type: 'bearer',
          value: token.value!.release(),
          expiresAt: token.expiresAt,
        },
        permissions: { ...permissions[user.id_role_fk] },
      })
    } catch (error) {
      return response.unauthorized({
        message: 'Credenciais inválidas',
        error: error,
      })
    }
  }
  /**
   * Fazer logout do usuário (invalidar token atual)
   */
  async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const token = auth.user?.currentAccessToken
      if (token) {
        await User.accessTokens.delete(user, token.identifier)
      }
      return response.ok({
        message: 'Logout realizado com sucesso',
      })
    } catch (error) {
      return response.unauthorized({
        message: 'Token inválido',
      })
    }
  }
  /**
   * Obter informações do usuário autenticado
   */
  async me({ auth, params, response }: HttpContext) {
    try {
      const loggedUser = await auth.getUserOrFail()
      console.log('ENTROU')
      // se for gerente e um id for passado, ele pode ver outro cliente
      if (loggedUser.id_role_fk === 1 && params.id) {
        const client = await User.find(params.id)
        console.log(client)

        if (!client) {
          return response.notFound({
            message: 'Cliente não encontrado.',
          })
        }

        return response.ok({
          user: {
            id: client.id,
            cpf: client.cpf,
            name: client.name,
            email: client.email,
            createdAt: client.createdAt,
            id_role_fk: client.id_role_fk,
          },
          message: 'Dados do cliente acessados pelo gerente.',
        })
      }

      // se nao retorna o próprio usuário (cliente comum)
      return response.ok({
        user: {
          id: loggedUser.id,
          cpf: loggedUser.cpf,
          name: loggedUser.name,
          email: loggedUser.email,
          createdAt: loggedUser.createdAt,
          id_role_fk: loggedUser.id_role_fk,
        },
        message: 'Dados do usuário autenticado.',
      })
    } catch (error) {
      return response.unauthorized({
        message: 'Token inválido',
      })
    }
  }

  async getUserAddress({ params, response, bouncer }: HttpContext) {
    //   const user = await auth.getUserOrFail()

    //   if (await bouncer.with(ClientPolicy).denies('list')) {
    //     return response.forbidden({ message: 'Você não tem permissão para listar clientes' })
    //   }
    try {
      const address = await Address.query().where('user_id_fk', params.id).first()

      if (!address) {
        return response.status(404).json({ message: 'Endereço não encontrado' })
      }

      return response.ok({
        address: {
          street: address.street,
          house_number: address.house_number,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
        },
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Erro ao buscar endereço' })
    }
  }
  /**
   * Criar um novo token para o usuário autenticado
   */
  async createToken({ auth, request, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const { name, abilities, expiresIn } = request.only(['name', 'abilities', 'expiresIn'])
      const token = await User.accessTokens.create(user, abilities || ['*'], {
        name: name || 'API Token',
        expiresIn: expiresIn || '30 days',
      })
      return response.created({
        message: 'Token criado com sucesso',
        token: {
          type: 'bearer',
          value: token.value!.release(),
          name: token.name,
          abilities: token.abilities,
          expiresAt: token.expiresAt,
        },
      })
    } catch (error) {
      return response.badRequest({
        message: 'Erro ao criar token',
        error: error.message,
      })
    }
  }
}

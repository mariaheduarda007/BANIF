import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import { permissions } from '../utils/permissions.js'


export default class StatementPolicy extends BasePolicy {
  list(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.id_role_fk].listStatement
  }
  view(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.id_role_fk].listStatement
  }
  create(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.id_role_fk].createStatement
  }
}

import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import { permissions } from '../utils/permissions.js'


export default class InvestmentsPolicy extends BasePolicy {
  create(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.id_role_fk].createSavings
  }
  get(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.id_role_fk].getSavings
  }
  
}

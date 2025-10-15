import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Address from './address.js'
import Role from './role.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cpf: string

  @column()
  declare name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare id_role_fk: number

  @column()
  declare id_address_fk: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Address, { foreignKey: 'id_address_fk' })
  declare address: BelongsTo<typeof Address>

  @belongsTo(() => Role, { foreignKey: 'id_role_fk' })
  declare role: BelongsTo<typeof Role>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Saving extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare value: number

  @column()
  declare id_user_fk: number

  @belongsTo(() => User, { foreignKey: 'id_user_fk' })
  declare user: BelongsTo<typeof User>
}

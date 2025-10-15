import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Investments extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare value: number

  @column()
  declare account_number_fk: number

  @belongsTo(() => User, { foreignKey: 'account_number_fk' })
  declare user: BelongsTo<typeof User>
}

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'


export default class Account extends BaseModel {
   public static table = 'account'
  @column({ isPrimary: true })
  declare account_number: string
  
  @column()
  declare agency_number: number

  @column()
  declare balance: number

  @column()
  declare id_user_fk: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User, { foreignKey: 'id_user_fk' })
  declare user: BelongsTo<typeof User> 
}
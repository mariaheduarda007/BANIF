import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare value: number

  @column()
  declare type: boolean

  
  @column()
  declare id_user_fk: number
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  
  @belongsTo(() => User, { foreignKey: 'id_user_fk' })
      declare user: BelongsTo<typeof User> 
}
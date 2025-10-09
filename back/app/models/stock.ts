import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Stock extends BaseModel {
   @column({ isPrimary: true })
  declare id: number

  @column()
  declare value: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


   @belongsTo(() => User, { foreignKey: 'id_user_fk' })
      declare user: BelongsTo<typeof User> 
  
}
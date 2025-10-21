import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Account from './account.js'

export default class Transaction extends BaseModel {
  public static table = 'transaction' 

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare account_number_sender: string

  @column()
  declare account_number_recipient: string

  @column()
  declare value: number
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  
}
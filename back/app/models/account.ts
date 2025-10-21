import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Savings from './savings.js'
import Investments from './investments.js'


export default class Account extends BaseModel {
   public static table = 'account'
  @column({ isPrimary: true })
  declare account_number: string
  
  @column()
  declare agency_number: string

  @column()
  declare balance: number

  @column()
  declare user_id_fk: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User, { foreignKey: 'user_id_fk' })
  declare user: BelongsTo<typeof User> 

  @hasOne(() => Savings, { foreignKey: 'account_number_fk' })
    public savings!: HasOne<typeof Savings>

     @hasOne(() => Investments, { foreignKey: 'account_number_fk' })
    public investments!: HasOne<typeof Investments>


}
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js' 

export default class Address extends BaseModel {
  public static table = 'address' // força o nome singular, tive bastante erro com isso
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id_fk: number

  @column()
  declare street: string 

  @column()
  declare neighborhood: string

  @column()
  declare house_number: number

  @column()
  declare city: string

  @column()
  declare state: string

  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare user: BelongsTo<typeof User>
  
}
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Address extends BaseModel {
  public static table = 'address' // força o nome singular, tive bastante erro com isso
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare street: string 

  @column()
  declare neighborhood: string

  @column()
  declare number: number

  @column()
  declare city: string

  @column()
  declare state: string

}
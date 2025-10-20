import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Savings from '#models/savings'

export default class extends BaseSeeder {
  async run() {
    await Savings.createMany([
      {
        id: 1,
        value: 0,
        account_number_fk: '12345678900'
      },     
    ])
  }
}

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Investments from '#models/investments'

export default class extends BaseSeeder {
  async run() {
    await Investments.createMany([
      {
        id: 1,
        value: 0,
        account_number_fk:'12345678900'
      },
    ])
  }
}

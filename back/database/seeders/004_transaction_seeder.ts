import Transaction from '#models/transaction'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Transaction.createMany([
      {
        id: 1,
        value: 20,
        id_user_fk: 1, 
        type: false,
      }
    ])
  }
}

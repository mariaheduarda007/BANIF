import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Account from '#models/account'

export default class extends BaseSeeder {
  async run() {
    await Account.createMany([
      {
        account_number: '12345-6',
        agency_number: '1234-5',
        balance: 100,
        user_id_fk: 2,        
      },
      
    ])
  }
}
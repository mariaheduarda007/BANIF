import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Account from '#models/account'

export default class extends BaseSeeder {
  async run() {
    await Account.createMany([
      {
        account_number: '12345678900',
        agency_number: '134465',
        balance: 100,
        id_user_fk: 1,        
      },
      
    ])
  }
}
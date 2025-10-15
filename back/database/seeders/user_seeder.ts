import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        cpf: '12345678900',
        name: 'Claudio',
        email: 'claudio@example.com',
        password:  '12345678', 
        id_role_fk: 1,
        id_address_fk: 1
      },
      {
        cpf: '98765432100',
        name: 'Xeila',
        email: 'xeila@example.com',
        password:  '12345678', 
        id_role_fk: 2,
        id_address_fk: 2

      },
    ])
  }
}
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
        role_id_fk: 1,
      },
      {
        cpf: '98765432100',
        name: 'Xeila',
        email: 'xeila@example.com',
        password:  '12345678', 
        role_id_fk: 2,
      },
    ])
  }
}
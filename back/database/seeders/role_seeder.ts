import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        id: 1,
        name: 'Manager',
      },
      {
        id: 2,
        name: 'Client',
      },
    ])
  }
}

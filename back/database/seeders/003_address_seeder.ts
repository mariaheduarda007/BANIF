import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Address from '#models/address'

export default class extends BaseSeeder {
  async run() {
    await Address.createMany([
      {
        id: 1,
        user_id_fk: 1,
        street: 'Cascavel',
        neighborhood: 'Flamingo',
        house_number: 21,
        city: 'Matinhos',
        state: 'Paraná',

      },
      {
        id: 2,
        user_id_fk: 2,
        street: 'Cascavel',
        neighborhood: 'Flamingo',
        house_number: 11,
        city: 'Matinhos',
        state: 'Paraná',
      },
    ])
  }
}

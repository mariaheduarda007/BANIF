import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Address from '#models/address'

export default class extends BaseSeeder {
  async run() {
    await Address.createMany([
      {
        id: 1,
        street: 'Cascavel',
        neighborhood: 'Flamingo',
        number: 21,
        city: 'Matinhos',
        state: 'Paraná',

      },
      {
        id: 2,
        street: 'Cascavel',
        neighborhood: 'Flamingo',
        number: 11,
        city: 'Matinhos',
        state: 'Paraná',
      },
    ])
  }
}

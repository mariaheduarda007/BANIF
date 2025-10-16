import vine from '@vinejs/vine'

export const createInvestments = vine.compile(
  vine.object({
    value: vine.number().positive(),
  })
)

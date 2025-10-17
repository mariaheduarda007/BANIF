// create statement - ange

export const permissions = [
  {
    listClient: false,  // ange
    viewClient: false, // ange
    createClient: false, // ange 
    listStatement: false, // feito
    createTransaction: false, // ange
    createSavings: false,  // maria
    getSavings: false, // maria
    createInvestments: false, // maria
    getInvestments: false, // maria
  },
  // MANAGER - 1
  {
    listClient: true,
    viewClient:true,
    createClient: true,
    listStatement: true,
    createTransaction: false,
    createSavings: false,
    getSavings: false,
    createInvestment: true,
    getInvestments: false,

  },
  // CLIENT - 2
  {
    listClient: false,
    viewClient: true,
    createClient: false,
    listStatement: true,
    createTransaction: true,
    createSavings: true,
    getSavings: true,
    createInvestment: true,
    getInvestments: true,

  },
]

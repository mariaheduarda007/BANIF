export const permissions = [
  {
    listCliet: false,
    viewClient: false,
    createClient: false, 
    listTransaction: false,
    viewTransaction: false,
    createTransaction: false,
    addSaving: false,
    addStock: false,
    addGovTitle: false,
  },
  // MANAGER - 1
  {
    listCliet: true,
    viewClient: false,
    createClient: true,
    listTransaction: false,
    createTransaction: true,
    addSaving: false,
    addStock: true,
    addGovTitle: true,
  },
  // CLIENT - 2
  {
    listCliet: false,
    viewClient: true,
    createClient: false,
    // editClient: true,
    // deleteClient: true, 
    listTransaction: true,
    createTransaction: true,
    addSaving: true,
    addStock: false,
    addGovTitle: true,
  },
]

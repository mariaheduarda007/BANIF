export const permissions = [
  {
    listCliet: false,
    viewClient: false,
    createClient: false, 
    listStatement: false,
    viewStatement: false,
    createStatement: false,
    addSaving: false,
    addStock: false,
    addGovTitle: false,
  },
  // MANAGER - 1
  {
    listClient: false,
    viewClient: false,
    createClient: true,
    listStatement: true,
    createStatement: true,
    addSaving: false,
    addStock: true,
    addGovTitle: true,
  },
  // CLIENT - 2
  {
    listClient: false,
    viewClient: true,
    createClient: false,
    // editClient: true,
    // deleteClient: true, 
    listStatement: true,
    createStatement: true,
    addSaving: true,
    addStock: false,
    addGovTitle: true,
  },
]

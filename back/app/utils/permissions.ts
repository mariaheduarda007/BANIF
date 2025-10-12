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
    listCliet: true,
    viewClient: false,
    createClient: true,
    listStatement: false,
    createStatement: true,
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
    listStatement: true,
    createStatement: true,
    addSaving: true,
    addStock: false,
    addGovTitle: true,
  },
]

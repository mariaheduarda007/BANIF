export const policies = {
ClientPolicy: () => import('#policies/client_policy'),
StatementPolicy: () => import('#policies/statement_policy'),
InvestmentsPolicy: () => import('#policies/investments_policy'),
}
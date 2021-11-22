const STORE_CUSTOMERS = (state, customers) => {
  state.customers = customers.data
}

const STORE_CUSTOMER = (state, customer) => {
  state.customer = customer.data
}

export default {
  STORE_CUSTOMERS,
  STORE_CUSTOMER,
}

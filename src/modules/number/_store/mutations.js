const STORE_NUMBERS = (state, numbers) => {
  state.numbers = numbers.data
}

const STORE_NUMBER = (state, number) => {
  state.number = number.data
}

export default {
  STORE_NUMBERS,
  STORE_NUMBER,
}

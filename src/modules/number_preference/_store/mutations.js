const STORE_NUMBER_PREFERENCES = (state, numberPreferences) => {
  state.numberPreferences = numberPreferences.data
}

const STORE_NUMBER_PREFERENCE = (state, numberPreference) => {
  state.numberPreference = numberPreference.data
}

export default {
  STORE_NUMBER_PREFERENCES,
  STORE_NUMBER_PREFERENCE,
}

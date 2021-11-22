<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-title> Number Preference </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="3" sm="3" md="3">
            <v-autocomplete
              v-model="form.number_id"
              dense
              outlined
              item-text="number"
              item-value="id"
              :items="numbers"
              :rules="[rules.required]"
              label="Number *"
            />
          </v-col>
          <v-col cols="3" sm="3" md="3">
           <v-text-field
              v-model="form.value"
              background-color="white"
              dense
              outlined
              :rules="[rules.required]"
              maxlength="100"
              label="Value"
            />
          </v-col>
          <v-col cols="3" sm="3" md="3">
            <v-text-field
              v-model="form.name"
              background-color="white"
              dense
              outlined
              :rules="[rules.required]"
              maxlength="100"
              label="Name"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" dark class="mb-2" @click="submit"> Save </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import storeNumberPreference from '../_store/index'
import storeNumber from '../../number/_store/index'

export default {
  name: 'FormNumberPreference',
  props: {},
  data() {
    return {
      rules: {
        required: value => !!value || 'The field is required',
      },
      form: {
        number_id: null,
        name: '',
        value: '',
      },
    }
  },
  async beforeCreate() {
    const STORE_KEY_CUSTOMER = '$_numberPreference'
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY_CUSTOMER in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY_CUSTOMER, storeNumberPreference)
    }
    const STORE_KEY_NUMBER = '$_number'
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY_NUMBER in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY_NUMBER, storeNumber)
    }
  },
  async mounted() {
    if (_.hasIn(this.$route.params, 'id')) {
      console.log('this.$route.params.id ', this.$route.params.id)
      await this.showNumberPreference(this.$route.params.id)
    }
    this.getNumbers()
  },
  computed: {
    ...mapGetters({
      numberPreference: '$_numberPreference/numberPreference',
      numbers: '$_number/numbers',
    }),
  },
  methods: {
    ...mapActions({
      getNumbers: '$_number/get',
      showNumberPreference: '$_numberPreference/show',
      storeNumberPreference: '$_numberPreference/post',
      updateNumberPreference: '$_numberPreference/update',
    }),
    async submit() {
      if (this.touch()) {
        if (_.hasIn(this.$route.params, 'id')) {
          await this.updateNumberPreference({ ...this.form, id: this.$route.params.id })
          this.$router.push({ name: 'number-preferences' })
        } else {
          await this.storeNumberPreference(this.form)
          this.$router.push({ name: 'number-preferences' })
        }
      }
    },
    touch() {
      return this.$refs.form.validate()
    },
  },
  watch: {
    numberPreference(newNumberPreference) {
      console.log('newNumberPreference ', newNumberPreference)
      this.form.number_id = newNumberPreference.number_id
      this.form.value = newNumberPreference.value
      this.form.name = newNumberPreference.name
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

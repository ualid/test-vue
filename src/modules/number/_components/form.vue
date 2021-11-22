<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-title> Number </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="3" sm="3" md="3">
            <v-autocomplete
              v-model="form.customer_id"
              dense
              outlined
              item-text="name"
              item-value="id"
              :items="customers"
              :rules="[rules.required]"
              label="Customer *"
            />
          </v-col>
          <v-col cols="3" sm="3" md="3">
            <v-autocomplete
              v-model="form.status_id"
              dense
              outlined
              item-text="name"
              item-value="id"
              :items="statuses"
              :rules="[rules.required]"
              label="Status *"
            />
          </v-col>
          <v-col cols="3" sm="3" md="3">
            <v-text-field
              v-model="form.number"
              background-color="white"
              dense
              outlined
              :rules="[rules.required, rules.min]"
              maxlength="14"
              label="Number *"
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
import storeNumber from '../_store/index'
import storeCustomer from '../../customer/_store/index'
import storeStatus from '../../status/_store/index'

export default {
  name: 'FormNumber',
  props: {},
  data() {
    return {
      rules: {
        required: value => !!value || 'The field is required',
        min: value => value.length >= 8 || 'The document must be at least 8 characters.',
      },
      form: {
        customer_id: null,
        status_id: null,
        number: '',
      },
    }
  },
  async beforeCreate() {
    const STORE_KEY_CUSTOMER = '$_customer'
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY_CUSTOMER in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY_CUSTOMER, storeCustomer)
    }
    const STORE_KEY_STATUS = '$_status'
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY_STATUS in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY_STATUS, storeStatus)
    }
    const STORE_KEY_NUMBER = '$_number'
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY_NUMBER in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY_NUMBER, storeNumber)
    }
  },
  async mounted() {
    if (_.hasIn(this.$route.params, 'id')) {
      await this.showNumber(this.$route.params.id)
    }
    await this.getStatuses({ limit: -1 })
    this.getCustomers({ limit: -1 })
  },
  computed: {
    ...mapGetters({
      statuses: '$_status/statuses',
      customers: '$_customer/customers',
      number: '$_number/number',
    }),
  },
  methods: {
    ...mapActions({
      getStatuses: '$_status/get',
      getCustomers: '$_customer/get',
      showNumber: '$_number/show',
      storeNumber: '$_number/post',
      updateNumber: '$_number/update',
    }),
    async submit() {
      if (this.touch()) {
        if (_.hasIn(this.$route.params, 'id')) {
          console.log('update')
          await this.updateNumber({ ...this.form, id: this.$route.params.id })
          this.$router.push({ name: 'numbers' })
        } else {
          await this.storeNumber(this.form)
          this.$router.push({ name: 'numbers' })
        }
      }
    },
    touch() {
      return this.$refs.form.validate()
    },
  },
  watch: {
    number(newNumber) {
      console.log('newNumber ', newNumber)
      this.form.status_id = newNumber.status_id
      this.form.customer_id = newNumber.customer_id
      this.form.number = newNumber.number
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

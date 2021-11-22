<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-title> Customer </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="3" sm="3" md="3">
            <v-autocomplete
              v-model="form.user_id"
              dense
              outlined
              item-text="name"
              item-value="id"
              :items="users"
              :rules="[rules.required]"
              label="User *"
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
          <v-col cols="3" sm="3" md="3">
            <v-text-field
              v-model="form.document"
              background-color="white"
              dense
              outlined
              :rules="[rules.required, rules.minDocument]"
              maxlength="12"
              label="Title Document"
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
import storeCustomer from '../_store/index'

//  import storeUSer from '../../user/_store/index'
import storeStatus from '../../status/_store/index'

export default {
  name: 'FormCustomer',
  props: {},
  data() {
    return {
      rules: {
        required: value => !!value || 'The field is  required',
        minDocument: value => value.length >= 6 || 'The document must be at least 6 characters.',
      },
      form: {
        user_id: null,
        status_id: null,
        name: null,
        document: '',
      },
    }
  },
  async beforeCreate() {
    const STORE_KEY_CUSTOMER = '$_customer'
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY_CUSTOMER in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY_CUSTOMER, storeCustomer)
    }

    // const STORE_KEY_USER = '$_user'
    // eslint-disable-next-line no-underscore-dangle
    // if (!(STORE_KEY_USER in this.$store._modules.root._children)) {
    // this.$store.registerModule(STORE_KEY_USER, storeUSer)
    // }
    const STORE_KEY_STATUS = '$_status'
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY_STATUS in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY_STATUS, storeStatus)
    }
  },
  async mounted() {
    if (_.hasIn(this.$route.params, 'id')) {
      console.log('this.$route.params.id ', this.$route.params.id)
      await this.showCustomer(this.$route.params.id)
    }
    await this.getStatuses({ limit: -1 })
    this.getUsers({ limit: -1 })
  },
  computed: {
    ...mapGetters({
      statuses: '$_status/statuses',
      users: '$_user/users',
      customer: '$_customer/customer',
    }),
  },
  methods: {
    ...mapActions({
      getStatuses: '$_status/get',
      getUsers: '$_user/get',
      showCustomer: '$_customer/show',
      storeCustomer: '$_customer/post',
      updateCustomer: '$_customer/update',
    }),
    async submit() {
      if (this.touch()) {
        if (_.hasIn(this.$route.params, 'id')) {
          console.log('update')
          await this.updateCustomer({ ...this.form, id: this.$route.params.id })
          this.$router.push({ name: 'customers' })
        } else {
          await this.storeCustomer(this.form)
          this.$router.push({ name: 'customers' })
        }
      }
    },
    touch() {
      return this.$refs.form.validate()
    },
  },
  watch: {
    customer(newCustomer) {
      console.log('newCustomer ', newCustomer)
      this.form.user_id = newCustomer.user_id
      this.form.status_id = newCustomer.status_id
      this.form.name = newCustomer.name
      this.form.document = newCustomer.document
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

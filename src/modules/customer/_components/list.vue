<template>
  <v-data-table :headers="headers" :items="customers" :items-per-page="5" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Customers</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="$router.push({ name: 'customers.create' })">
          New Customer
        </v-btn>
      </v-toolbar>
    </template>
     <template v-slot:item.actions="{ item }">
        <v-icon
            class="mr-2"
            @click="editItem(item.id)"
          >
            {{ iconList[0].icon }}
          </v-icon>
          <v-icon
            @click="deleteItem(item.id)"
          >
            {{ iconList[1].icon }}
          </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mdiDeleteOutline, mdiPencilOutline } from '@mdi/js'
import storeCustomer from '../_store/index'

export default {
  name: 'ListCustomer',
  props: {},
  data() {
    return {
      iconList: [
        {
          icon: mdiPencilOutline,
        },
        {
          icon: mdiDeleteOutline,
        },
      ],
      headers: [
        {
          text: '',
          value: 'actions',
        },
        {
          text: 'Id',
          align: 'start',
          value: 'id',
        },
        { text: 'name', value: 'name' },
      ],
      rules: {
        required: value => !!value || 'The field is required',
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
  computed: {
    ...mapGetters({
      customers: '$_customer/customers',
    }),
  },
  async beforeCreate() {
    const STORE_KEY_CUSTOMER = '$_customer'
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY_CUSTOMER in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY_CUSTOMER, storeCustomer)
    }
  },
  async mounted() {
    await this.getCustomers({ limit: -1 })
  },
  methods: {
    editItem(id) {
      console.log({ id })
      this.$router.push({
        name: 'customers.edit',
        params: {
          id,
        },
      })
    },
    async deleteItem(id) {
      await this.deleteCustomer(id)
      await this.getCustomers()
    },
    ...mapActions({
      getCustomers: '$_customer/get',
      deleteCustomer: '$_customer/deleteCustomer',
    }),
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

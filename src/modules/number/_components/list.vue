<template>
  <v-data-table :headers="headers" :items="numbers" :items-per-page="5" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Numbers</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="$router.push({ name: 'numbers.create' })">
          New Number
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
import storeNumber from '../_store/index'

export default {
  name: 'ListNumber',
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
        { text: 'number', value: 'number' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      numbers: '$_number/numbers',
    }),
  },
  async beforeCreate() {
    const STORE_KEY_NUMBER = '$_number'
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY_NUMBER in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY_NUMBER, storeNumber)
    }
  },
  async mounted() {
    await this.getNumbers()
  },
  methods: {
    editItem(id) {
      console.log({ id })
      this.$router.push({
        name: 'numbers.edit',
        params: {
          id,
        },
      })
    },
    async deleteItem(id) {
      await this.deleteNumber(id)
      await this.getNumbers()
    },
    ...mapActions({
      getNumbers: '$_number/get',
      deleteNumber: '$_number/deleteNumber',
    }),
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

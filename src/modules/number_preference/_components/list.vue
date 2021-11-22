<template>
  <v-data-table :headers="headers" :items="numberPreferences" :items-per-page="5" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Number Preferences</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="$router.push({ name: 'number-preferences.create' })">
          New Number Preferences
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
import storeNumberPreference from '../_store/index'

export default {
  name: 'ListNumberPreference',
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
        { text: 'Number', value: 'number.number' },
        { text: 'Name', value: 'name' },
        { text: 'Value', value: 'value' },
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
      numberPreferences: '$_numberPreference/numberPreferences',
    }),
  },
  async beforeCreate() {
    const STORE_KEY_NUMBER_PREFERENCE = '$_numberPreference'
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY_NUMBER_PREFERENCE in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY_NUMBER_PREFERENCE, storeNumberPreference)
    }
  },
  async mounted() {
    await this.getNumberPreferences()
  },
  methods: {
    editItem(id) {
      console.log({ id })
      this.$router.push({
        name: 'number-preferences.edit',
        params: {
          id,
        },
      })
    },
    async deleteItem(id) {
      await this.deleteNumberPreference(id)
      await this.getNumberPreferences()
    },
    ...mapActions({
      getNumberPreferences: '$_numberPreference/get',
      deleteNumberPreference: '$_numberPreference/deleteNumberPreference',
    }),
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

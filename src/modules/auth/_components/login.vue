<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              Test Laravel
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Welcome to Test Laravel! 👋🏻
          </p>
          <p class="mb-2">
            Please sign-in to your account and start the adventure
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="form.email"
              outlined
              label="Email"
              placeholder="john@example.com"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              outlined
              type="password"
              label="Password"
              placeholder="············"
              hide-details
            ></v-text-field>
            <v-btn
              block
              color="primary"
              class="mt-6"
              @click="submit"
            >
              Login
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import Jwt from '@/api/jwt'
import storeAuth from '../_store/index'

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      auth: '$_auth/auth',
    }),
  },
  async beforeCreate() {
    const STORE_KEY_AUTH = '$_auth'
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY_AUTH in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY_AUTH, storeAuth)
    }
  },
  methods: {
    ...mapActions({
      login: '$_auth/post',
    }),
    async submit() {
      if (this.touch()) {
        await this.login(this.form)

        if (_.hasIn(this.auth, 'user')) {
          await Jwt.saveToken(this.auth.access_token)
          this.$router.push({ name: 'customers' })
        }
      }
    },
    touch() {
      return this.$refs.form.validate()
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

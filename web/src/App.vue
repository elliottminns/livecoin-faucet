<template>
  <div id="app">
    <div class="section container has-text-centered">
      <img src="./assets/logo.png">
      <info :symbol="symbol" :minutes="minutes" />
      <address-form :symbol="symbol" :minutes="minutes" />
      <payouts-table :symbol="symbol" :payouts="payouts" />
    </div>
  </div>
</template>

<script>
import Info from '@/components/info'
import AddressForm from '@/components/address-form'
import PayoutsTable from '@/components/payouts-table'
import Payouts from '@/api/payouts'

export default {
  name: 'App',
  components: {
    Info,
    AddressForm,
    PayoutsTable
  },
  computed: {
    symbol() {
      return 'LVC'
    },
    minutes() {
      return 10
    }
  },
  data() {
    return {
      payouts: []
    }
  },
  mounted() {
    window.setInterval(() => {
      this.reloadPayouts()
    }, 120 * 1e3)
    this.reloadPayouts()
  },
  methods: {
    async reloadPayouts() {
      this.payouts = await Payouts.read()
    }
  }
}
</script>

<style>
</style>

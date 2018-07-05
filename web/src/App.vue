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
      payouts: [{
        address: 'my-payout-address',
        amount: 10e8,
        txid: 'abcdefg'
      }]
    }
  }
}
</script>

<style>
</style>

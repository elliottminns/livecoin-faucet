<template>
<div class="section">
  <h1 class="title">Previous Payouts</h1>
  <table class="table is-bordered">
    <thead>
      <tr>
        <th>Address</th>
        <th>Amount ({{ symbol }})</th>
        <th>Transaction Id</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="payout in payouts" :key="payout.txid">
        <td>{{ payout.address }}</td>
        <td>{{ (payout.amount / 1e8).toFixed(8) }} </td>
        <td>{{ payout.txid }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  name: 'PayoutTable',
  props: {
    payouts: {
      type: Array,
      required: true,
      default: () => []
    },
    symbol: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
table.table {
  margin-left: auto;
  margin-right: auto;
}
</style>

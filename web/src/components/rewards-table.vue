<template>
<table class="table is-bordered">
  <thead>
    <tr>
      <th>Amount ({{ symbol }})</th>
      <th>Chance</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="reward in rewards" :key="reward.prize">
      <th>{{ (reward.prize / 1e8) }}</th>
      <td>
        {{ reward.chance / magnitude * 100 }}%
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>

export default {
  props: {
    symbol: {
      type: String,
      required: true
    },
    rewards: {
      type: Array,
      required: true,
      default: () => []
    },
    magnitude: {
      type: Number,
      required: true,
      default: 100000
    }
  }
}

</script>

<style lang="scss" scoped>
table.table {
  margin-left: auto;
  margin-right: auto;
}
</style>

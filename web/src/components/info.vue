<template>
<div class="section">
  <h1 class="title is-4">
    We're giving away {{ symbol }} every {{ minutes }} minutes
  </h1>
  <rewards-table :symbol="symbol" :rewards="rewards" />
  <h2 class="title is-6">
    All you have to do is enter your {{ symbol }} address
    and solve the captcha!
  </h2>
</div>
</template>

<script>
import RewardsTable from '@/components/rewards-table'

export default {
  name: 'Info',
  props: {
    symbol: {
      type: String,
      required: true
    },
    minutes: {
      type: Number,
      required: true
    }
  },
  components: {
    RewardsTable
  },
  data() {
    return {
      rewards: [{
        chance: 0.1,
        prize: 10e8
      }, {
        chance: 0.9,
        prize: 1e8
      }]
    }
  }
}
</script>

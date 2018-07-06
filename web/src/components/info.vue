<template>
<div class="section">
  <h1 class="title is-4">
    We're giving away {{ symbol }} every {{ minutes }} minutes
  </h1>
  <rewards-table :symbol="symbol"
                 :rewards="rewards"
                 :magnitude="magnitude" />
  <h2 class="title is-6">
    All you have to do is enter your {{ symbol }} address
    and solve the captcha!
  </h2>
</div>
</template>

<script>
import RewardsTable from '@/components/rewards-table'
import faucet from '@/../../faucet.json'

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
  computed: {
    rewards() {
      return faucet.rewards
    },
    magnitude() {
      return faucet.roll.max
    }
  }
}
</script>

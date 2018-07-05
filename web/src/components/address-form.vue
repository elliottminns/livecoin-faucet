<template>
<div class="section">
  <transition name="fade" mode="out-in">
    <div v-if="!success" key="form">
      <h1 class="title">{{ title }}</h1>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <input class="input is-large has-text-centered"
          type="text"
          :placeholder="title"
          v-model="address" />
        </div>
      </div>
      <coin-captcha @verify="onVerify" />
      <div class="field is-grouped is-grouped-centered">
        <p class="control">
        <button class="button is-primary is-large"
          :class="state"
          @click="onSubmit">
          Continue
        </button>
        </p>
      </div>
    </div>
    <div v-if="success" key="success">
      <h1 class="title">Your {{ symbol }} address is entered</h1>
      <h2 class="subtitle">
        You should receive your payout in the next {{ minutes }} minutes
      </h2>
    </div>
  </transition>
</div>
</template>

<script>
import CoinCaptcha from '@/components/captcha'

export default {
  name: 'Address Form',
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
  components: { CoinCaptcha },
  data() {
    return {
      address: '',
      captcha: '',
      state: '',
      success: false
    }
  },
  computed: {
    title() {
      return `Enter your ${this.symbol} address`
    }
  },
  methods: {
    onVerify(result) {
      this.captcha = result
    },
    async onSubmit() {
      if (!this.checkData() && this.state === '') { return }

      this.state = 'is-loading'

      // Make api request
      await new Promise((resolve) => {
        window.setTimeout(() => {
          resolve()
        }, 1000)
      })

      this.state = ''
      this.success = true

      await new Promise((resolve) => {
        window.setTimeout(() => {
          resolve()
        }, 5000)
      })

      this.reset()
    },
    reset() {
      this.state = ''
      this.address = ''
      this.captcha = ''
      this.success = false
    },
    checkData() {
      return (this.captcha && this.captcha.length > 0 &&
        this.address && this.address.length > 0)
    }
  }
}
</script>

<style scoped>
.input {
  min-width: 640px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

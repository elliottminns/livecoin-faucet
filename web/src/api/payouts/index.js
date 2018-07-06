import axios from 'axios'

export default {
  async read({ limit = 20 } = {}) {
    return axios.get('/api/payouts', { limit }).then(r => r.data)
  }
}

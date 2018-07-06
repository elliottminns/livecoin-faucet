import axios from 'axios'

export default {
  async create(data) {
    await axios.post('/api/entries', data)
  }
}

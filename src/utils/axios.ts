import axios from 'axios'
import { APPLICATION_NAME, SERVER_URL } from '../constants/application'

export default axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  headers: { 'X-Application-Name': APPLICATION_NAME },
})

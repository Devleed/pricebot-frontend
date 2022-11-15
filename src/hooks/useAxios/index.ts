import axios from 'axios'
import { APPLICATION_NAME, SERVER_URL } from '../../constants/application'
import { useAppSelector } from '../index'

export default () => {
  const signature = useAppSelector(state => state.wallet.signature)

  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000,
    headers: { 'X-Application-Name': APPLICATION_NAME },
  })

  axiosInstance.interceptors.request.use(
    config => {
      console.log('signature -', signature)

      if (signature && config.headers) {
        config.headers['x-vrs-signature'] = signature
      }

      return config
    },
    error => Promise.reject(error),
  )

  return axiosInstance
}

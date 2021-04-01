import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'

const baseURL = 'http://112.213.118.251:8080'

const api = axios.create({
    baseURL,
    timeout: 8080
})

api.interceptors.request.use((req) => {
    return req
})

api.interceptors.response.use((res) => {
    return res
}, err => console.log(err))

export default api
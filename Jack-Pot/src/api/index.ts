import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'

const baseURL: string = '/api'

const api = axios.create({
    baseURL,
    timeout: 8080
})

api.interceptors.request.use((req: AxiosRequestConfig) => {
    return req
})

api.interceptors.response.use((res: AxiosResponse) => {
    return res
}, err => console.log(err))

export default api
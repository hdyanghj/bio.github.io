import axios from 'axios'

const baseURL = 'http://112.213.118.251:8080'

const api = axios.create({
    baseURL,
    timeout: 8080
})

// 请求拦截
api.interceptors.request.use(
    function(config) {
        console.log('全局请求拦截')
        console.log(config)
        return config
    },
    function(err) {
        return Promise.reject(err)
    }
)

// 响应拦截
api.interceptors.response.use(
    function(response) {
        console.log('全局返回拦截')
        console.log(response.data)
        return response.data
        // return response
    },
    function(err) {
        return Promise.reject(err)
    }
)

export function get (url, params) {
    return api.get(url, {
        params
    })
}
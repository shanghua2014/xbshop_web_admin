import axios from 'axios'
import qs from 'qs'

const api = {
    async get (url, data) {
        try {
            let res = await axios.get(url, {
                params: data
            })
            res = res.data
            return new Promise((resolve) => {
                if (res.code === 0) {
                    resolve(res)
                } else {
                    resolve(res)
                }
            })
        } catch (err) {
            alert('服务器出错')
            console.log(err)
        }
    },
    async post (url, data='') {
        try {
            let res = await axios.post(url, qs.stringify(data))
                res = res.data
            return new Promise((resolve, reject) => {
                if (res.code === 2000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
        } catch (err) {
            // return (e.message)
            console.log('服务器出错'+err)
        }
    },
}
export {
    api
}
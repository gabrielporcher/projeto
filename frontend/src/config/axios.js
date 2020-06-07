import axios from 'axios'

const success = res => res //Do nothing

const error = err => {
    if (401 === err.response.status && !window.location.pathname.includes('auth')) { //every 401 error will call it [/when token expire it triggers a 401]
        window.location = '/' //Root have function to watch token
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error) //Every requisition will be intercepted
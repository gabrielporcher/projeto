import Vue from 'vue'

export const userKey = '_user_'
export const baseApiUrl = 'http://localhost:3000'

export function showError(e){ //Catch errors from backend
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError ({msg : e.response.data})
    } else if (typeof e === 'string'){
        Vue.toasted.global.defaultError({msg:e})
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default {baseApiUrl, showError, userKey} 
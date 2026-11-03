import Vue from "vue"
let link = ''
let url = ''
const production = true
if(production){
    link = 'https://app.aytec.com.co/panel/public'
    url = 'https://backend.app.aytec.com.co/api/auth'
} else{
    link = 'http://auditsalud.test'
    url = 'http://auditsalud.test/api/auth'
}

export let global = {
    apiUrl:url
}
import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/auth/auth';
import { global } from '@/global/methods_global'
Vue.use(Vuex);

export default {
    namespaced: true,
    state:{
        appointment:[],
        statusColor:{
            success:'#01579b',
            cancel:'#b71c1c',
            warning:'#ffeb3b'
        }
    },
    getters:{
        appointment(state: any){
            return state.appointment
        }
    },
    actions:{
        getAppointment: async function({commit }:any,id:string = ''){
            try {
                const config = {
                    method:'GET',
                    headers:{
                        'Authorization': 'Bearer ' + auth.getUserLogged()
                    }
                }
                let apiUrl = `${Vue.prototype.$url}/get/appoinment`
                if(id != ''){
                    apiUrl = `${global.apiUrl}/get/appoinment/${id}`
                }
                const data = await fetch(apiUrl,config)
                const json = await data.json()
                if(json.status){
                    commit('updateEvents',json.content)
                }
            } catch (error) {
                console.error("🚀 ~ file: Appoinment.ts ~ line 34 ~ getAppointment:function ~ error", error)
            }
        },
        saveAppointment: async function({commit}: any){
            
        }
    },
    mutations:{
        updateEvents(state: any,data: any){
            state.appointment = data
        }
    }
}

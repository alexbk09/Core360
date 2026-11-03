import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/auth/auth';
import { global } from '@/global/methods_global'
import { Entity } from '@/interface/Entity';

Vue.use(Vuex);

declare interface state{
    entity:string
}

declare interface response{
    status:Boolean,
    content:Array<Entity>,
    errors:string
}

export default {
    namespaced:true,
    state:{
        entity: [] = []
    },
    getters:{
        getEntity(state: state){
            return state.entity
        }
    },
    actions:{
        get: async function({commit}: any,id:string = ''){
            try {
                const url = id === '' ?  `${global.apiUrl}/entity` : `${global.apiUrl}/entity/${id}`
                const config = {
                    method:'GET',
                    headers:{
                        'Authorization': `Bearer ${auth.getUserLogged()}`
                    }
                }
                const request = await fetch(url,config)
                const response = await request.json()
                commit('updateEntity',response)
                
            } catch (error) {
                console.error("🚀 ~ file: Entity.ts ~ line 22 ~ getEntity ~ error", error)
            }
        },
        storeEntity: async function({commit}: any,data : Entity){
            try {
                let formData = new FormData()
                formData.append('name',JSON.stringify(data.name))
                formData.append('nit',JSON.stringify(data.nit))
                formData.append('key_contract',JSON.stringify(data.key_contract))
                let config = {
                    method:'POST',
                    headers:{
                        'Authorization': 'Bearer ' + auth.getUserLogged()
                    },
                    body:formData
                }

                const result = await fetch(`${global.apiUrl}/entity`,config)
                const response = await result.json()
                commit('createEntity',response.content)
            } catch (error) {
                console.error("🚀 ~ file: Entity.ts ~ line 56 ~ saveEntity:function ~ error", error)
            }
        }
    },
    mutations:{
        updateEntity(state: any,data: response){
            if(data.status){
                data.content.map((ent: Entity) => {
                    let struct = {
                        text:ent.name_insurance,
                        value: ent.id,
                    }
                    state.entity.push(struct)
                })
            }
        },
        createEntity(state: any,data: Entity){
            let struct = {
                text:data.name_insurance,
                value: data.id,
            }
            state.entity.push(struct)
        }
    }
}
import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/auth/auth';
import Appoinment from './Appoinment';
import Entity from './Entity';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
	permission:[],
	user:{},
	options:[
		{
			text:'SOAT',
			value:'SOAT',
		},
		{
			text:'ESCOLAR',
			value:'ESCOLAR',
		},
		{
			text:'VIDA',
			value:'VIDA',
		},
		{
			text:'COMPLEMENTARIAS',
			value:'COMPLEMENTARIAS',
		},
		{
			text:'ARL',
			value:'ARL',
		},
		{
			text:'EPS',
			value:'EPS',
		}
	],
	type_identification:[
		{
			text: 'Cédula ciudadania',
			value: 'Cédula ciudadania'
		},
		{
			text: 'Cédula extranjería',
			value: 'Cédula extranjería'
		},
		{
			text: 'Pasaporte',
			value: 'Pasaporte'
		},
		{
			text: 'Registro civil',
			value: 'Registro civil'
		},
		{
			text: 'Tarjeta de identidad',
			value: 'Tarjeta de identidad'
		},
		{
			text: 'Adulto sin identificación',
			value: 'Adulto sin identificación'
		},
		{
			text: 'Menor sin identificación',
			value: 'Menor sin identificación'
		},
	],
  },
  mutations: {
	updatePermissionList: (state,payload) => {
		state.permission = payload
	}
  },
  actions: {
	getPermission: async({state,commit}) => {
		let config = {
			method:'GET',
			headers:{
				'Authorization':'Bearer ' + auth.getUserLogged()
			}
		}
		fetch(`${Vue.prototype.$url}/get/permission`,config)
		.then(rs => rs.json())
		.then(response => {
			commit('updatePermissionList',response.content)
		})
	}
  },
  modules: {
	Appoinment,
	Entity
  },
  getters:{
	
  }
});
		

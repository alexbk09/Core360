<template>
    <div>
        <b-container fluid >
            <b-row align-h="end">
                <b-col align-self="end" cols="3">
                    <b-form inline class="">
                        <label class="sr-only" for="inline-form-input-name">Categorias</label>
                        <b-form-select id="inline-form-custom-select-pref" class="mb-2 mr-sm-2 mb-sm-0"
                        :options="[{ text: 'Categorias...', value: null }, 'Categorias', 'Categorias', 'Categorias']"
                        :value="null"
                        ></b-form-select>
                    
                        <label class="sr-only" for="inline-form-input-username">Buscar</label>
                        <b-input-group  class="mb-2 mr-sm-2 mb-sm-0">
                            <b-form-input id="inline-form-input-username" placeholder="Buscar"></b-form-input>
                        </b-input-group>

                    </b-form>
                </b-col>
            </b-row>
        </b-container>
        <b-container fluid class="bv-example-row">
            <b-row >
                <b-col cols="12">
                    <h3 class=" mr-2">Solicitud de medicamento</h3>
                </b-col>
                <b-col cols="3" class="mt-4" v-for="item in request" :key="id">
                <div class="card" v-b-modal.modal-1 @click="buscar(item.id_request)">
                    <div class="card-header">
                        <span><b>Pendiente</b></span> <b-icon  class="rounded-circle icono bg-danger p-2" variant="light"></b-icon>
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title" style="text-transform: capitalize;">{{item.name}}</h5>
                        <p class="card-text">{{item.created_at}}</p>
                    </div>
                </div>
                </b-col>
            </b-row>
        </b-container>

        <b-modal id="modal-1" title="BootstrapVue">
            <p class="my-4">Hello from modal!</p>
        </b-modal>
      </div>
</template>
<style>
    .icono{
        position: absolute;
        right: 15px;
        top: 15px;
    }
</style>

<script>
import auth from '../../../auth/auth'
export default {
	name:'UserList',
	data() {
		return {
			request:{},
			search:'',
		}
	},
	methods:{
		getRequest(){
			const config = {
				method:'POST',
                body:{},
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url  + '/get/medicine_request',config).then((response) => {
				response.json().then((data) => {
					this.request = data.content;
				})
			})
		},
		filterUser(){
			console.log('init')
		},
        buscar(item){
            let formData = new FormData()
            formData.append('item',item)
            const config = {
				method:'POST',
                body:formData,
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url  + '/get/medicine_request_details',config).then((response) => {
				response.json().then((data) => {
					//console.log("🚀 ~ file: medication_order.vue ~ line 87 ~ response.json ~ data", data)
					this.$router.push('/inventory/personnel/'+item)
				})
			})
        }
	},
	computed:{
		
	},
	mounted() {
		this.getRequest()
	},
}
</script>
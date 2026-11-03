<template>
	<div>
		<div class="card">
			<div class="card-body">
				<b-row>
					<b-col cols="4">
						<input type="text" v-model="search" @keypress="filterUser()" placeholder="Buscar Contrato..." class="form-control">
					</b-col>
					<b-col cols="8" class="text-right">
						<b-button-group>
							<b-button variant="primary" @click="navegarForms()">
								<b-icon-file-earmark-plus></b-icon-file-earmark-plus>
							</b-button>
						</b-button-group>
					</b-col>
				</b-row>
				<b-row>
					<table class="table table-striped mt-5">
						<thead>
							<tr>
								<th>Id</th>
								<th>Nombre</th>
								<th>Nit</th>
								<th>Categoría</th>
								<th>Fecha de registro</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr :key="contract.sku_contract" v-for="contract in contracts">
								<td>{{ contract.id_contract }}</td>
								<td>{{ contract.name_comercials }}</td>
								<td>{{ contract.sku_contract }}</td>
								<td>{{ contract.category_contract }}</td>
								<td>{{ new Date(contract.created_at) | dateFormat('DD/MM/YYYY h:m:s A') }}</td>
								<td></td>
							</tr>
						</tbody>
					</table>
					<Pagination 
						:data="paginate"
						v-on:selectLink="getContractPage($event)"
					/>
				</b-row>
			</div>
		</div>
	</div>
</template>

<script>
import auth from '../../../../auth/auth'
import Pagination from '@/components/Pagination.vue'
export default {
	name:'UserList',
	data() {
		return {
			contracts:[],
			search:'',
			paginate:[]
		}
	},
	components:{
		Pagination
	},
	methods:{
		getContract(){
			const config = {
				method:'POST',
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url  + '/get/contract',config).then((response) => {
				response.json().then((data) => {
					if(data.status){
						this.contracts = data.content.data
						this.paginate = data.content
					}
				})
			})
		},
		getContractPage($event){
			const config = {
				method:'POST',
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch($event,config).then((response) => {
				response.json().then((data) => {
					if(data.status){
						this.contracts = data.content.data
						this.paginate = data.content
					}
				})
			})
		},
		filterUser(){
			console.log('init')
		},
		navegarForms(){
			this.$router.push('/contract/create');
		},
	},
	mounted() {
		this.getContract()
	},
}
</script>
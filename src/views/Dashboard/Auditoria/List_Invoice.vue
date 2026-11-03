<template>
	<div>
		<b-row class="container-search">
			<b-col cols="10">
				<b-row v-show="showFilter">
					<b-col cols="2" >
						<InputComponent 
							titulo="# Factura" 
							name="nit" 
							type="text"
							v-model="filter_search.invoice"
							v-on:input="getInvoice($event)"
						/>
					</b-col>
					<b-col cols="2">
						<InputComponent 
							titulo="Lote" 
							name="nit" 
							type="text"
							v-model="filter_search.lote"
							v-on:input="getInvoice($event)"
						/>
					</b-col>
					<b-col cols="2">
						<label>Tipo de cuenta</label>
						<b-form-select v-model="filter_search.account" v-on:change="getInvoice($event)" :options="account" />
						
					</b-col>
					<b-col cols="2" >
						<label for="#">Estado</label>
						<b-form-select v-model="filter_search.status" v-on:change="getInvoice($event)" :options="estado"/>
					</b-col>
				</b-row>
			</b-col>
			<b-col cols="2" class="container-filter">
				<button class="btn btn-dark" v-on:click="showFilter = !showFilter">
					<span class="mr-3"> Filtrar </span> <b-icon-filter-square-fill />
				</button>
			</b-col>
		</b-row>
		<div class="card mt-5">
			<div class="card-body">
				<b-row>
					<b-col cols="8">
						<h1>Detalle del lote: # {{ entity.lote }}</h1>
					</b-col>
				</b-row>
				<b-row>
					<b-col cols="2">
						<b>Nit:</b> {{ entity.num_id }}
					</b-col>
					<b-col cols="4">
						<b>Entidad:</b> {{ entity.name_insurance }}
					</b-col>
					<b-col cols="3">
						<b>Cantidad de facturas:</b> {{ entity.qty_fac }}
					</b-col>
					<b-col cols="3">
						<b>Valor total de facturas:</b> {{ entity.value_entity }}
					</b-col>
				</b-row>
				<b-row>
					<b-col cols="12">
						<SkeletonTable v-if="loading"/>
					</b-col>
					<table v-if="!loading" class="table table-striped mt-2">
						<thead>
							<tr>
								<th>Prefijo</th>
								<th># Factura</th>
								<th>Lote</th>
								<th>Nit</th>
								<th>Nombre</th>
								<th>Tipo de cuenta</th>
								<th>Valor total</th>
								<th>Estado</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							
							<tr :key="invoice.id" v-for="invoice in invoices">
								<td>{{ invoice.prefix }}</td>
								<td>{{ invoice.numfac }}</td>
								<td>{{ invoice.lote }}</td>
								<td>{{ invoice.nit_entidad }}</td>
								<td>{{ invoice.name_insurance }}</td>
								<td>{{ invoice.type_user }}</td>
								<td>{{ invoice.valglosa | number_format }}</td>
								<td>
									<div class="badge badge-success" v-if="invoice.status === 1">
										Diligenciado
									</div>
									<div class="badge badge-warning" v-if="invoice.status === 0">
										Pendiente
									</div>
								</td>
								<td>
									<router-link :to="{ 
											name:'Detalle Factura',
											params:{
												nit:invoice.nit_entidad,
												invoices:invoice.numfac
											}
										}"
									>
										<b-icon-eye></b-icon-eye>
									</router-link>
								</td>
								<td></td>
							</tr>
						</tbody>
					</table>
					<Pagination 
						:data="content"
						v-on:selectLink="getLink($event)"
					/>
				</b-row>
			</div>
		</div>
	</div>
</template>
<script>
import auth from './../../../auth/auth'
import Pagination from '@/components/Pagination.vue'
import SkeletonTable from '@/components/Skeleton/TableSkeleton.vue'
import InputComponent from '@/components/Form/InputComponet.vue'
import '@/assets/css/skeleton.css'
import '@/assets/css/List_invoice.css'

export default {
	name:'ListInvoice',
	data() {
		return {
			invoices: [],
			params: {
				nit:this.$route.params.nit,
				lote:this.$route.params.lote,
				radical:this.$route.params.radicals,
			},
			filter_search:{},
			content:[],
			account:[
				{
					text:'',
					value:''
				}
			],
			estado:[
				{
					text:'Pendiente',
					value:0
				},
				{
					text:'Disponible',
					value:1
				}
			],
			showFilter:false,
			entity:{},
			loading:true
		}
	},
	components:{
		Pagination,
		SkeletonTable,
		InputComponent
	},
	methods: {
		getInvoice(){
			let formData = new FormData()
			formData.append('nit',this.params.nit)
			formData.append('lote',this.params.lote)
			formData.append('radical',this.params.radical)
			formData.append('filter',JSON.stringify(this.filter_search))
			const config = {
				method:'POST',
				body:formData,
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url  + '/get/audit/invoce',config).then((response) => {
				response.json().then((data) => {
					this.loading = false
					if(data.status){
						this.content = data.content.invoice
						this.invoices = data.content.invoice.data
						this.entity = data.content.entity
					}else{
						this.invoices = []
					}
				})
			})
		},
		getInvoicePerPage(url){
			this.loading = true
			let formData = new FormData()
			formData.append('nit',this.params.nit)
			formData.append('lote',this.params.lote)
			formData.append('radical',this.params.radical)
			formData.append('filter',JSON.stringify(this.filter_search))
			const config = {
				method:'POST',
				body:formData,
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(url,config).then((response) => {
				response.json().then((data) => {
					if(data.status){
						this.loading = false
						this.content = data.content.invoice
						this.invoices = data.content.invoice.data
						this.entity = data.content.entity
					}
				})
			})
		},
		getLink($event){
			this.getInvoicePerPage($event)
			console.log('Priedades emitidas',$event)
		},
	},
	mounted() {
		this.getInvoice()
		this.getUserAccount().then((data) => {
			data.json()
			.then((response) => {
				if(response.status){
					response.content.map(x => {
						let account = {
							text:x.concept,
							value:x.concept
						}
						this.account.push(account)
					})
				}
			})
		})
	},
}
</script>
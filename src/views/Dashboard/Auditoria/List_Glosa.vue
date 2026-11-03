<template>
	<div>
		<div class="card">
			<div class="card-body">
				<b-row>
					<b-col cols="4">
						<input type="text" placeholder="Buscar Entidad..." class="form-control">
					</b-col>
				</b-row>
				<b-row v-if="loading">
					<b-col cols="12">
						<SkeletonTable />
					</b-col>
				</b-row>
				<b-row v-if="!loading">
					<table class="table table-stripped">
						<thead>
							<tr>
								<th>Nit</th>
								<th>Nombre</th>
								<th>Radicado Interno</th>
								<th>Lote</th>
								<th>Valor</th>
								<th>Corte de la facturación</th>
								<th>Fecha de creación</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr :key="detail.id" v-for="detail in lists">
								<td>{{ detail.num_nit }}</td>
								<td>{{ detail.name_insurance }}</td>
								<td>{{ detail.radicals }}</td>
								<td>{{ detail.lote }}</td>
								<td>{{ detail.value_entity | number_format }}</td>
								<td>{{ detail.deadline }}</td>
								<td>{{ new Date(detail.created_at) | dateFormat('DD/MM/YYYY h:m:s A') }}</td>
								<td>
									<div class="input-action">
										<router-link :to="{ 
												name:'Detalle Lote',
												params:{
													lote:detail.lote,
													nit:detail.num_nit,
													radicals:detail.radicals
												}
											}"
										>
											<b-icon-eye></b-icon-eye>
										</router-link>
										<a class="text-primary" @click="showPanel(detail)">
											<b-icon-pencil-square></b-icon-pencil-square>
										</a>
										<a v-show="permission_list" class="text-danger" @click="deleteEntity(detail.id,detail.name_insurance)">
											<b-icon-x-circle-fill></b-icon-x-circle-fill>
										</a>
										<a class="text-primary" @click="exportDocument(detail.lote,detail.num_nit,detail.radicals)">
											<b-icon-cloud-download-fill></b-icon-cloud-download-fill>
										</a>
									</div>
								</td>
							</tr>
						</tbody>
					</table> 
				</b-row>
			</div>
		</div>
		<offCanvas :show='show' ref="offCanvas" v-on:statusOffCanvas="statusCanvas($event)" :data='detail'/>
	</div>
</template>
<script>
import auth from './../../../auth/auth'
import moment from "moment"
import SkeletonTable from '@/components/Skeleton/TableSkeleton.vue'
import offCanvas from '@/components/Offcanvas/offCanvas.vue'
import './../../../assets/css/listGlosa.css'
export default{
	name:'ListGlosa',
	data() {
		return {
			lists:[],
			loading:true,
			nit:this.$route.params.nit,
			show:false,
			detail:{},
			permission_list:false
		}
	},
	components:{
		SkeletonTable,
		offCanvas
	},
	methods: {
		getListGlosa() {
			let formData = new FormData()
			formData.append('nit',this.nit)
			const config = {
				method:'POST',
				body:formData,
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url  + '/get/list/audit',config).then((response) => {
				response.json().then((data) => {
					this.loading = false
					if(data.status){
						this.lists = data.content.data
						return
					}
					this.$alertify.success('No tenemos registros para mostrar')
				})
			})
		},
		showPanel(property){
			this.show = true
			this.detail = property
			this.$refs.offCanvas.getHistory()
		},
		statusCanvas($event){
			this.show = $event
		},
		deleteEntity(id,name){
			let v = confirm('Estas seguro de eliminar ' + name)
			if(!v){
				return false
			}
			const config = {
				method:'DELETE',
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url  + '/entity/delete/'+id,config).then((response) => {
				response.json().then((data) => {
					if(data.status){
						this.getListGlosa()
						this.$alertify.success('Eliminamos el registro con exito')
					}
					
				})
			})
		},
		exportDocument(lote,nit,radicals){
			const config = {
				method:'GET',
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged(),
					'Content-Type': 'application/json'
				}
			}
			fetch(`${this.$url}/export/document/${lote}/${nit}/${radicals}`,config).then((response) => {
				response.json().then((data) => {
					if(data.status){
						var win = window.open(`${this.$link}export/document/${data.content}`, '_blank');
					}
					
				})
			})
		}
	},
	mounted() {
		this.getListGlosa()
		this.validatePermission(21)
		.then(rs => this.permission_list = rs)
		//this.exportDataFromJson(sampleData,null,null)
	},
}
</script>

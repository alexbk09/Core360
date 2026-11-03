<template>
	<div>
		<div class="card">
			<div class="card-body">
				<b-row>
					<b-col cols="4">
						<input type="text" placeholder="Buscar Rol..." class="form-control">
					</b-col>
					<b-col cols="8" class="text-right">
						<b-button-group>
							<b-button variant="primary" @click="navegarForm()">
								<b-icon-file-earmark-plus></b-icon-file-earmark-plus>
							</b-button>
						</b-button-group>
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
								<th>ID</th>
								<th>Nombre del Rol</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr :key="rol.id" v-for="rol in rols">
								<td>{{ rol.id_rol }}</td>
								<td>{{ rol.name_rol }}</td>
								<td>
									<router-link :to="{ 
										name:'Editar Rol',
										params:{
											id:rol.id_rol,
											}
										}"
									>
										<b-icon-eye></b-icon-eye>
									</router-link>
								</td>
							</tr>
						</tbody>
					</table>
				</b-row>
			</div>
		</div>
	</div>
</template>

<script>
import auth from '@/auth/auth.js'
import SkeletonTable from '@/components/Skeleton/TableSkeleton.vue'
export default {
	name:'RolPage',
	data() {
		return {
			loading:true,
			rols:[]
		}
	},
	components:{
		SkeletonTable
	},
	methods: {
		getRol(){
			const config = {
				method:'POST',
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url + '/get/rol',config)
			.then((response) => {
				this.loading = false
				response.json()
				.then((responseData) => {
					console.log(responseData)
					if(responseData.status){
						this.rols = responseData.content
					}
				})
			})		
		},
		navegarForm(){
			this.$router.push('/rol/create');
		},
	},
	mounted() {
		this.getRol()
	},
}
</script>
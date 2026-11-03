<template>
	<div>
		<div class="card">
			<div class="card-body">
				<b-row>
					<b-col cols="4">
						<input type="text" placeholder="Buscar Entidad..." class="form-control">
					</b-col>
				</b-row>
				<b-row>
					<table class="table table-striped mt-5">
						<thead>
							<tr>
								<th>Id</th>
								<th>Lote</th>
								<th>Nit</th>
								<th>Nombre</th>
								<th>Radicado Interno</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr :key="radical.id" v-for="radical in listRadicals">
								<td>{{ radical.id }}</td>
								<td>{{ radical.lote }}</td>
								<td>{{ radical.num_nit }}</td>
								<td>{{ radical.name_insurance }}</td>
								<td>{{ radical.radicals }}</td>
								<td>
									<router-link :to="{ 
											name:'Detalle Lote',
											params:{
												lote:radical.lote,
												nit:radical.num_nit,
												radicals:radical.radicals
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
				</b-row>
			</div>
		</div>
	</div>
</template>
<script>
import auth from './../../../auth/auth'
export default {
	name: "ListData",
	data(){
		return{
			radicals:this.$route.params.radicals,
			listRadicals:[]
		}
	},
	methods: {
		getParamsRouter(){
			let formData = new FormData()
			let config = {
					method:'POST',
					body:formData,
					headers:{
						'Authorization': 'Bearer ' + auth.getUserLogged()
					}
			}
			fetch(this.$url + `/audit/list/${this.radicals}`,config)
			.then((response) => {
				if(response.ok){
					response.json()
					.then((responseData) => {
						console.log(responseData)
						if(responseData.status){
							this.listRadicals = responseData.content
						}
					})
				}
			})

		}
	},
	mounted(){
		this.getParamsRouter()
	}
}
</script>
<template>
	<div>
		<div class="card">
			<div class="card-body">
				<b-row>
					<b-col cols="4">
						<input type="text" v-model="search" @keypress="filterUser()" placeholder="Buscar Usuario..." class="form-control">
					</b-col>
					<b-col cols="8" class="text-right">
						<b-button-group>
							<b-button variant="primary" @click="navegarForm()">
								<b-icon-file-earmark-plus></b-icon-file-earmark-plus>
							</b-button>
							<b-button variant="primary">
								<b-icon-cloud-upload></b-icon-cloud-upload>
							</b-button>
						</b-button-group>
					</b-col>
				</b-row>
				<b-row>
					<table class="table table-striped mt-5">
						<thead>
							<tr>
								<th>Id</th>
								<th>Username</th>
								<th>Nombre</th>
								<th>Estado</th>
								<th>Correo</th>
								<th>Fecha de registro</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr :key="user.name" v-for="user in users">
								<td>{{ user.id }}</td>
								<td>{{ user.username }}</td>
								<td>{{ user.name }}</td>
								<td>{{ user.status }}</td>
								<td>{{ user.email }}</td>
								<td>{{ new Date(user.created_at) | dateFormat('DD/MM/YYYY h:m:s A') }}</td>
								<td>
									<router-link :to="{ 
										name:'Editar usuario',
										params:{
												id:user.id,
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
import auth from '../../../../auth/auth'
export default {
	name:'UserList',
	data() {
		return {
			users:{},
			search:'',
		}
	},
	methods:{
		getUser(){
			const config = {
				method:'POST',
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url  + '/get/user',config).then((response) => {
				response.json().then((data) => {
					this.users = data.content.data;
				})
			})
		},
		filterUser(){
			console.log('init')
		},
		navegarForm(){
			this.$router.push('/user/create');
		},
	},
	computed:{
		
	},
	mounted() {
		this.getUser()
	},
}
</script>
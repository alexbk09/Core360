<template>
	<div>
		<form @submit="onSubmit">
			<b-container fluid>
				<b-row>
						<b-col cols="8">
							<div class="card">
								<div class="card-header bg-white">
									<h4>Información del usuario</h4>
								</div>
								<div class="card-body">
									<b-row>
										<b-col cols="6">
											<InputComponent titulo="Nombre" name="name" v-model="formUser.name" />
										</b-col>
										<b-col cols="6">
											<InputComponent titulo="Identificación" name="id" v-model="formUser.id" />
										</b-col>
									</b-row>
									<b-row>
										<b-col cols="6">
											<InputComponent titulo="Teléfono" name="phone" v-model="formUser.phone" />
										</b-col>
										<b-col cols="6">
											<InputComponent titulo="Correo" name="email" v-model="formUser.email" />
										</b-col>
									</b-row>
								</div>
							</div>
							<div class="card mt-3 mb-3">
								<div class="card-header bg-white">
									<h4>Roles</h4>
								</div>
								<div class="card-body">
									<b-row>
										<b-col cols="6">
											<div class="form-group">
												<label for="">Seleccione el Rol</label>
												<select name="status" class="form-control" v-model="formUser.rol" id="">
													<option :value="r.value" :key="r.value + r.text" v-for="r in check">{{ r.text }}</option>
												</select>
											</div>
										</b-col>
									</b-row>
								</div>
							</div>
							<div class="card mt-3 mb-3">
								<div class="card-header bg-white">
									<h4>Contrato</h4>
								</div>
								<div class="card-body">
									<b-row>
										<b-col cols="6">
											<b-form-group v-slot="{ariaDescribedby}">
												<b-form-checkbox-group
													id="role"
													v-model="formUser.contract"
													:options="contracts"
													:aria-describedby="ariaDescribedby"
													name="rol"
													stacked
												></b-form-checkbox-group>
											</b-form-group>
										</b-col>
									</b-row>
								</div>
							</div>
							<div class="card mt-3 mb-3">
								<div class="card-header bg-white">
									<h4>Tipo de polizas</h4>
								</div>
								<div class="card-body">
									<b-row>
										<b-col cols="6">
											<b-form-group v-slot="{ariaDescribedby}">
												<b-form-checkbox-group
													id="polizas"
													v-model="formUser.polizas"
													:options="$store.state.options"
													:aria-describedby="ariaDescribedby"
													name="polizas"
													stacked
												></b-form-checkbox-group>
											</b-form-group>
										</b-col>
									</b-row>
								</div>
							</div>
						</b-col>
						<b-col cols="4">
							<div class="card">
								<div class="card-header bg-white">
									<h4>Datos de acceso</h4>
								</div>
								<div class="card-body">
									<InputComponent titulo="Usuario" name="username" v-model="formUser.username" />
									<InputComponent titulo="Clave" type="password" name="username" v-model="formUser.password" />
									<div class="form-group">
										<label for="">Estado</label>
										<select name="status" v-model="formUser.status" class="form-control" id="">
											<option value="">Seleccione el estado</option>
											<option value="1">Activo</option>
											<option value="0">Inactivo</option>
										</select>
									</div>
								</div>
							</div>
							<div class="text-right mt-3">
								<button class="btn btn-primary" type="submit">Guardar</button>
							</div>
						</b-col>
				</b-row>
			</b-container>
		</form>
	</div>
</template>

<script>
	import InputComponent from '@/components/Form/InputComponet.vue'
	import CheckboxComponent from '@/components/Form/CheckboxComponent.vue'
	import auth from '@/auth/auth.js'
	export default {
		name:'UpdateUser',
		data() {
			return {
				formUser:{
					rol:[],
					email:''
				},
				rol:[],
				check:[],
				contracts:[],
				id:this.$route.params.id
			}
		},
		methods:{
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
							responseData.content.map((content) => {
								let struct = {
									text:content.name_rol,
									value:content.id_rol
								}
								this.check.push(struct)
							})
						}
					})
				})		
			},
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
							data.content.data.map((rs) => {
								let struct = {
									text:rs.name_comercials,
									value:rs.id_contract
								}
								this.contracts.push(struct)
							})
						}
					})
				})
			},
			onSubmit(e){
				console.log(this.formUser)
				var pattern = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/; 
				e.preventDefault()
				if(this.formUser.name == '' || this.formUser.name == undefined){
					this.$alertify.error('El nombre es obligatorio')
					return false
				}
				if(this.formUser.id == '' || this.formUser.id == undefined){
					this.$alertify.error('La identificación es obligatorio')
					return false
				}
				/* if(this.formUser.phone == '' || this.formUser.phone == undefined){
					this.$alertify.error('El telefono es obligatorio')
					return false
				} */
				
				if(this.formUser.email == '' || this.formUser.email == undefined){
					this.$alertify.error('El correo es obligatorio')
					return false
				}
				if(!pattern.test(this.formUser.email)){
					this.$alertify.error('El correo no tiene un formato valido')
					return false
				}
				if(this.formUser.rol == '' || this.formUser.rol == undefined){
					this.$alertify.error('El usuario debe tener un rol')
					return false
				}
				if(this.formUser.contract == undefined || this.formUser.contract.length == 0){
					this.$alertify.error('Asigne por lo menos un contrato')
					return false
				}
				if(this.formUser.polizas == undefined || this.formUser.polizas.length == 0){
					this.$alertify.error('Asigne por lo menos un tipo de poliza')
					return false
				}
				if(this.formUser.username == '' || this.formUser.username == undefined){
					this.$alertify.error('El usuario es obligatorio')
					return false
				}
				if(this.formUser.status == '' || this.formUser.status == undefined){
					this.$alertify.error('Deben asignar el estado al usuario')
					return false
				}
				let formData = new FormData()
				const form = this.formUser
				formData.append('name',form.name)
				formData.append('email',form.email)
				formData.append('password',form.password)
				formData.append('username',form.username)
				formData.append('fullname',form.name)
				formData.append('rol',form.rol)
				formData.append('client',JSON.stringify(form.contract))
				formData.append('status',form.status)
				formData.append('identification',form.id)
				formData.append('id',this.id)
				formData.append('polizas',form.polizas)
				const config = {
					method:'POST',
					body: formData,
					headers:{
						'Authorization': 'Bearer ' + auth.getUserLogged()
					}
				}
				fetch(this.$url + '/update/user',config)
				.then((response) => {
					this.loading = false
					response.json()
					.then((responseData) => {
						console.log(responseData)
						if(responseData.status){
							this.$alertify.success('El usuario se actualizo con exito')
						}else{
							if(responseData.errors){
								for (const key in responseData.errors) {
										const element = responseData.errors[key];
										this.$alertify.error(element[0])
								}
							}
						}
					})
				})	
			},
			async getDetailUser(){
				const config = {
					method:'POST',
					headers:{
						'Authorization': 'Bearer ' + auth.getUserLogged()
					}
				}
				fetch(this.$url  + `/get/user/${this.id}`,config).then((response) => {
					response.json().then((data) => {
						if(data.status){
							const client = data.content
							this.formUser = {
								name:client.name,
								email:client.email,
								username:client.username,
								fullname:client.fullname,
								status:client.status,
								id:client.identification,
							}
							this.formUser.contract = client.client != null ? JSON.parse(client.client) : []
							this.formUser.polizas = client.polizas.split(',')
							this.formUser.rol = data.content.rol
							
						}
					})
				})
			}
		},
		components:{
			InputComponent,
			CheckboxComponent
		},
		async mounted() {
			this.getRol()
			this.getContract()
			await this.getDetailUser()
		},
	}
</script>
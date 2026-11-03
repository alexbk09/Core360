<template>
	<div>
		<b-overlay :show="show" rounded="sm">
			<b-container fluid>
				<b-row>
					<b-col lg="9" class="content-full-hight background-left">
						<div class="content-padding">
							<h1 class="text-left">Sistema de auditoria Medica</h1>
							<h3 class="text-left">El sistema que te agiliza toda el crm de gestión para tus auditores online</h3>
						</div>
					</b-col>
					<b-col lg="3" class="content-full-hight">
						<div class="padding-form">
							<form action="" v-on:submit.prevent="iniciarSesion">
								<img class="img-fluid d-block m-auto" width="250" src="@/assets/image/logo_icon_primary.png" alt="">
								<div>
									<label for="">Nombre de usuario</label>
									<input type="text" name="username" v-model="dataForm.username" class="form-control">
									<b-alert v-if="msg_error.username" variant="danger" show>{{ msg_error.username }}</b-alert>
								</div>
								<div>
									<label for="">Clave de usuario</label>
									<input type="password" name="password" v-model="dataForm.password" class="form-control">
									<b-alert v-if="msg_error.password" variant="danger" show>{{ msg_error.password }}</b-alert>
								</div>
								<b-alert v-if="msg_error.credentials" variant="danger" show>{{ msg_error.credentials }}</b-alert>
								<button class="btn bg-classic btn-block mt-3">Ingresar</button>
							</form>
						</div>
					</b-col>
				</b-row>
			</b-container>
		</b-overlay>
	</div>
</template>

<script>
import auth from './../auth/auth'
import './../assets/login.css'
export default {
	name:'Login',
	data(){
		return {
			dataForm : {
					username:'',
					password:'',
			},
			msg_error:{
				username:'',
				password:'',
				credentials:'',
			},
			show:false,
		}
	},
	methods:{
		iniciarSesion(){
			//console.log(this.dataForm.username,this.dataForm.password)
			this.msg_error = {}
			if(this.dataForm.username.length == 0){
				this.msg_error.username = "El usuario es obligatorio"
				return
			}
			if(this.dataForm.password.length == 0){
				this.msg_error.password = "La clave es obligatorio"
				return
			}
			this.show = true
			var formData = new FormData()
			formData.append('username',this.dataForm.username)
			formData.append('password',this.dataForm.password)
			//console.log(this.$url)
			const config = {
				method:'POST',
				body:formData,
				headers: {}
			}
			
			fetch(`${this.$url}/login`,config).then((response) => {
				response.json().then((data) => {
					if(data.status){
						localStorage.setItem('apiKey',data.access_token)
						auth.setUserLogged(data.access_token)
						auth.expiresIn(data.expires_in)
						this.$store.state.user = data.user
						this.$store.state.permission = data.privilegies
						localStorage.setItem('user',JSON.stringify(data.user))
						localStorage.setItem('privilegies',JSON.stringify(data.privilegies))
						this.$router.push("/panel")
					}else{
						this.msg_error.credentials = "Las credenciales son incorrectas"
						this.show = false
						return false
					}
				})
			})
			.catch(e => {
					console.log("🚀 ~ file: Login.vue:102 ~ fetch ~ e", e)
					this.msg_error.credentials = "Tuvimos un error de conexión"
					this.show = false
					return false
			})
				
		},
	},
	mounted() {
		document.title = 'Portal Administrativo Aytech | Login'
	},
}
</script>
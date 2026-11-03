<template>
	<div>
		<form @submit="onSubmit">
			<div class="card">
				<div class="card-body">
					<b-row>
						<div class="col-lg-6">
							<InputComponent 
								titulo="Nombre del Rol"
								name="name_rol"
								type="text"
								:value="rol.name_rol"
								v-model="rol.name_rol"
							/>
						</div>
					</b-row>
					<b-row>
						<div class="col-lg-12">
							<h3>Permisos en la aplicacion</h3>
							<hr>
						</div>
						<div class="col-4 mb-3" :key="priv.privilegies" v-for="priv in name_privilegies">
							<h5>{{ priv }}</h5>
							<div :key="pr.id_privilegies" v-for="pr in value_privilegies">
								<div v-if="pr.privilegies === priv">
									<label for="#" >
										<input type="checkbox" :checked="validatePrivilegies(pr.id_privilegies)" @click="checkedPrivilegies(pr.id_privilegies)" name="" id="" /> {{ pr.description }}
									</label>
								</div>
							</div>
						</div>
					</b-row>
					<div class="text-right">
						<div class="text-right mt-3">
							<button class="btn btn-primary" type="submit">Guardar</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>
<script>
import auth from '@/auth/auth.js'
import InputComponent from '@/components/Form/InputComponet.vue'
import SkeletonTable from '@/components/Skeleton/TableSkeleton.vue'
export default {
	name:'FormRol',
	data() {
		return {
			name_privilegies:[],
			value_privilegies:[],
			check_privilegies:[],
			rol:{},
			params:'',
			url:''

		}
	},
	components:{
		SkeletonTable,
		InputComponent
	},
	methods: {
		getPrivilegies(){
			const config = {
				method:'POST',
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url + '/get/privilegies',config)
			.then((response) => {
				this.loading = false
				response.json()
				.then((responseData) => {
					if(responseData.status){
						var arr = []
						responseData.content.map((pr) => {
							if(arr.indexOf(pr.privilegies) == -1){
								arr = [...arr,pr.privilegies]
							}
						})
						this.name_privilegies = arr
						this.value_privilegies = responseData.content
					}
				})
			})
		},
		checkedPrivilegies(id){
			if(this.check_privilegies.indexOf(id) == -1){
				this.check_privilegies.push(id)
				console.log('Linea 91',this.check_privilegies)
				return 
			}
			var position = this.check_privilegies.indexOf(id)
			var data = this.check_privilegies
			this.check_privilegies = data.slice(0,position)
			console.log('Linea 101',this.check_privilegies)
			return 
		},
		onSubmit(e){
			e.preventDefault()
			let formData = new FormData()
			formData.append('name_rol',this.rol.name_rol)
			formData.append('checked_privilegies',JSON.stringify(this.check_privilegies))
			
			this.url = this.$url + '/create/rol'
			if(this.params != ''){
				this.url = this.$url + '/update/rol'
				formData.append('id',this.params)
			}
			const config = {
				method:'POST',
				body:formData,
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.url,config)
			.then((response) => {
				this.errors = []
				response.json()
				.then((responseData) => {
					if(responseData.status){
						this.$alertify.success(responseData.content)
						this.$router.push({path:`/rol/create/${responseData.rol.id}`})
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
		getDetail(id){
			let formData = new FormData()
			formData.append('id',id)
			const config = {
				method:'POST',
				body:formData,
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url + '/detail/rol',config)
			.then((response) => {
				this.loading = false
				response.json()
				.then((responseData) => {
					if(responseData.status){
						responseData.content.privilegies.map(pr => {
							this.check_privilegies.push(parseInt(pr.priv))
						})
						this.rol.name_rol = responseData.content.name.rol
					}
				})
			})
		},
		validatePrivilegies(id){
			const data = this.check_privilegies
			console.log("🚀 ~ file: FormRol.vue ~ line 167 ~ validatePrivilegies ~ data", data)
			for (let index = 0; index < data.length; index++) {
				const element = data[index];
				if(element == id){
					return true
				}
			}
			return false
		}
	},
	mounted() {
		this.getPrivilegies()
		if(this.$route.params.id != undefined){
			this.params = this.$route.params.id
			this.getDetail(this.params)
		}
	},
}
</script>
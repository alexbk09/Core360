<template>
	<div>
		<b-container fluid>
			<b-row>
				<b-col cols="8">
					<div class="card">
						<div class="card-header">
							Datos del contrato
						</div>
						<div class="card-body">
							<b-row>
								<b-col cols="6">
									<InputComponent titulo="Nombre del prestador" name="name" v-model="contract.name" />
									<ErrorAlert v-if="errors.name" msg="El nombre del prestador es obligatorio"></ErrorAlert>
								</b-col>
								<b-col cols="6">
									<InputComponent titulo="Código" name="code" v-model="contract.code" />
									<ErrorAlert v-if="errors.name" msg="El codigo del prestador es obligatorio"></ErrorAlert>
								</b-col>
							</b-row>
							<b-row>
								<b-col cols="6">
									<SelectComponent 
										label="Tipo de tomador" 
										default_option="Tipo de tomador" 
										:options="tomador" 
										name="tomador" 
										id="tomador" 
										v-model="contract.tomador" 
									/>
								</b-col>
								<b-col cols="6">
									<SelectComponent 
										label="Categoria del contrato" 
										default_option="Categoria del contrato" 
										:options="options" 
										name="categoria" 
										id="categoria_contract" 
										v-model="contract.category" 
									/>
								</b-col>
							</b-row>
							<b-row>
								<b-col cols="6">
									<label for="fstart">Fecha de inicio</label>
    								<b-form-datepicker id="fstart" v-model="contract.fstart" class="mb-2"></b-form-datepicker>
								</b-col>
								<b-col cols="6">
									<label for="fend">Fecha final</label>
    								<b-form-datepicker id="fend" v-model="contract.fend" class="mb-2"></b-form-datepicker>
								</b-col>
							</b-row>
							<b-row>
								<b-col cols="6">
									<InputComponent titulo="Monto de cobertura" name="amount" v-model="contract.amount" />
								</b-col>
								<b-col cols="6">
									<InputComponent titulo="Cobertura" name="cobertura" v-model="contract.coverted" />
								</b-col>
							</b-row>
							<b-row>
								<b-col cols="6">
									<InputComponent titulo="Región Ips" name="amount" v-model="contract.region" />
								</b-col>
								<b-col cols="6">
									<InputComponent titulo="Zona Ips" name="zone" v-model="contract.zone" />
								</b-col>
							</b-row>
							<b-row>
								<b-col cols="6">
									<InputComponent titulo="Ciudad Ips" name="amount" v-model="contract.city" />
								</b-col>
							</b-row>
						</div>
					</div>
					<div class="text-right mt-3">
						<button class="btn btn-primary" @click="sendForm">Guardar</button>
					</div>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import InputComponent from '@/components/Form/InputComponet.vue'
import SelectComponent from '@/components/Form/SelectComponent.vue'
import ErrorAlert from '@/components/Form/ErrorAlert.vue'
import auth from './../../../../auth/auth'

export default {
	name:'FormContract',
	components:{
		InputComponent,
		SelectComponent,
		ErrorAlert,
	},
	data() {
		return {
			errors:{
				code:false,
				name:false,
				status: true,
			},
			contract:{},
			options:[
				{
					text:'SOAT',
					value:'SOAT',
				},
				{
					text:'ESCOLAR',
					value:'ESCOLAR',
				},
				{
					text:'VIDA',
					value:'VIDA',
				},
				{
					text:'COMPLEMENTARIAS',
					value:'COMPLEMENTARIAS',
				},
				{
					text:'ARL',
					value:'ARL',
				},
				{
					text:'EPS',
					value:'EPS',
				}
			],
			tomador:[
				{
					text:'INDIVIDUAL',
					value:'INDIVIDUAL',
				},
				{
					text:'COLECTIVA',
					value:'COLECTIVA',
				},
				{
					text:'OTROS',
					value:'OTROS',
				},
			]
		}
	},
	methods:{
		sendForm(){
			this.setStatusError(true)
			if(this.contract.name == undefined){
				this.errors.name = true
				this.setStatusError(false)
			}
			if(this.contract.code == undefined){
				this.errors.code = true
				this.setStatusError(false)
			}
			if(!this.errors.status){
				return false
			}
			let formData = new FormData();
			formData.append('amount',this.contract.amount)
			formData.append('category',this.contract.category)
			formData.append('city',this.contract.city)
			formData.append('code',this.contract.code)
			formData.append('coverted',this.contract.coverted)
			formData.append('fend',this.contract.fend)
			formData.append('fstart',this.contract.fstart)
			formData.append('name',this.contract.name)
			formData.append('region',this.contract.region)
			formData.append('tomador',this.contract.tomador)
			formData.append('zone',this.contract.zone)
			const config = {
				method:'POST',
				body:formData,
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url  + '/add/contract',config).then((response) => {
				response.json().then((data) => {
					console.log(data.content.data);
					if(data.status){
						this.$alertify.success('El registro fue exitoso');
					}else{
						this.$alertify.error('Tuvimos un error al guardar, intentalo más tarde');
					}
				})
			})
		},
		setStatusError(status){
			this.errors.status = status
		}
	}
}
</script>
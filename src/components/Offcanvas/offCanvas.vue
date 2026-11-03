<template>
	<div>
		<div class="offcanvas" :class="show ? 'active' : ''">
			<form @submit="sendHistory">
				<div class="offcanvas-header">
					Gestionar Ips <b>{{ data.name_insurance }}</b>
					<button type="button" class="btn btn-close" @click="closeModal()">x</button>
				</div>
				<div class="offcanvas-body">
					
						<b-row>
							<b-col cols="12">
								<!--<SelectComponent :options="selected" :default_option="management.type" label=""/>-->
								<label for="Tipo de gestión">Tipo de gestión</label>
								<b-form-select v-model="management.type" :options="selected" class="mt-3" />
							</b-col>
							<b-col cols="12">
								<label for="">Descripción de la gestión</label>
								<textarea class="form-control" v-model="management.description"/>
							</b-col>
							<b-col cols="12">
								<b-form-select v-model="management.direction" @change="setStatus($event)" :options="dirManagement" class="mt-3" />
							</b-col>
							<b-col cols="12" v-if="showCalendar">
								<label>Fecha de la cita</label><br>
								<date-picker v-model="management.appointment" type="datetime"></date-picker>
							</b-col>
							<b-col cols="12" v-if="showCalendar">
								<label>Responsable</label><br>
								<SelectComponent :options="users" label="Filtrar por usuario" @input="selectUser($event)"/>
							</b-col>
						</b-row>
						<b-row>
							<b-col cols="12">
								<div class="mt-2">
									Historial
								</div>
							</b-col>
							<b-col cols="12">
								<div class="d-flex justify-content-end">
									<button class="btn" v-show="listHistory.length > 0" @click="exportDataFromJson(listHistory,'Descargar-'+data.name_insurance,null)">
										<img src="@/assets/image/csv.png" class="img-fluid" alt="" />
									</button>
								</div>
								<div class="card mt-1" :key="item.id" v-for="item in listHistory">
									<div class="card-header d-flex justify-content-end" :class="{ 'bg-danger': item.status_appointment === 'CUENTA CERRADA NO CONCRETADA'  }">
										<button 
											class="btn btn-primary" 
											type="button" 
											@click="setStatusHistorial(item)" 
											v-show="verifyDate(item.created_at)">
											<b-icon-pencil-square></b-icon-pencil-square>
										</button>
										<div class="btn-group" v-show="validateAppointment(item.appointment) && item.status_appointment == null">
											<button type="button" class="btn btn-danger btn-sm" @click="setStatusManagament(item.id_history,'NO CONCRETO')">
												<small>
													<b-icon-x-circle-fill></b-icon-x-circle-fill>
												</small>
											</button>
											<button type="button" class="btn btn-success btn-sm" @click="setStatusManagament(item.id_history,'EXITOSA')">
												<small>
													<b-icon-check2-all></b-icon-check2-all>
												</small>
											</button>
										</div>
									</div>
									<div class="card-body">
										<b-row>
											<b-col cols="2">
												<img v-show="item.type_management == 'Llamada' && item.appointment == null" src="@/assets/image/phone-call.png" class="img-fluid" alt="">
												<img v-show="item.type_management == 'Correo Electronico' && item.appointment == null" src="@/assets/image/email.png" class="img-fluid" alt="">
												<img v-show="item.type_management == 'Correo electronico certificado' && item.appointment == null" src="@/assets/image/correo-electronico.png" class="img-fluid" alt="">
												<img v-show="item.appointment != null" src="@/assets/image/calendar.png" class="img-fluid" alt="">
											</b-col>
											<b-col cols="8">
												<b-row>
													<b-col cols="12">
														<p>{{ item.desc_management }} <br>
															<small v-show="item.appointment != null">Fecha de cita: {{ new Date(item.appointment) | dateFormat('DD/MM/YYYY') }}</small>
														</p>
													</b-col>
												</b-row>
											</b-col>
											<b-col cols="12" class="mb-3" v-show="item.status_appointment === 'NO CONCRETO'">
												<b-input-group prepend="Concepto" class="mt-3">
													<b-form-input v-model="concept"></b-form-input>
													<b-input-group-append>
													  <b-button type="button" variant="outline-success" @click="setConceptHistory(item.id_history)">
														<b-icon-check2-all></b-icon-check2-all>
													  </b-button>
													</b-input-group-append>
												  </b-input-group>
											</b-col>
										</b-row>
										<small v-show="item.appointment != null" class="small-date">{{ new Date(item.created_at) | dateFormat('DD/MM/YYYY h:m:s A') }}</small>
									</div>
								</div>
							</b-col>
						</b-row>
				</div>
				<div class="offcanvas-footer">
					<div class="position-relative text-right">
						<button class="btn btn-primary">Actualizar</button>
					</div>
				</div>
			</form>
		</div>
		<div @click="closeModal()" :class="show ? 'overlay' : ''">
				
		</div>
	</div>
</template>
<script>
import './../../assets/css/offcanvas.css'
import InputComponet from '@/components/Form/InputComponet.vue'
import SelectComponent from '@/components/Form/SelectComponent.vue'
import auth from '@/auth/auth'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import exportFromJSON from "export-from-json";
import * as moment from 'moment';
export default {
	name:'offCanvas',
	props:{
		show:{
			type: Boolean,
			required: true
		},
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			management:{
				appointment:'',
				status_appointment:'',
				responsible:'',
				type:''
			},
			selected:[
				{
					text:'Llamada',
					value: 'Llamada'
				},
				{
					text:'Correo Electronico',
					value:'Correo Electronico'
				},
				{
					text:'Correo electronico certificado',
					value:'Correo electronico certificado'
				},
			],
			dirManagement:[
				{
					text:'Se asigna cita',
					value:'1'
				},
				{
					text:'Se hace seguimiento',
					value:'2'
				},
			],
			showCalendar: false,
			time1: null,
			listHistory:[],
			message: null,
			id:null,
			concept:'',
			users:[]
			
		}
	},
	methods: {
		closeModal(){
			this.$emit('statusOffCanvas',false)
		},
		setImage(value){
			switch (value) {
				case 'Llamada':
					return '/assets/image/phone-call.png'
					break;
				case 'Correo Electronico':
					
					break;
				case 'Correo electronico certificado':
					
					break;
			}
		},
		setStatus($event){
			this.management.direction = $event
			this.showCalendar =  $event == 1 ? true : false
		},
		sendHistory(e){
			e.preventDefault()
			let formData = new FormData();
			let appointment = moment(this.management.appointment)
			formData.append('type_management',this.management.type)
			formData.append('desc_management',this.management.description)
			formData.append('dir_management',this.management.direction)
			formData.append('appointment',appointment.format('YYYY-MM-DD hh:mm:ss'))
			formData.append('status_appointment',this.management.status_appointment)
			formData.append('responsible',this.management.responsible)
			formData.append('status','1')
			formData.append('key_entity',this.data.num_nit)
			let url = this.$url  + '/insert/history'
			if(this.id != null){
				formData.append('id',this.id)
				url = this.$url  + '/update/history'
			}
			const config = {
				method:'POST',
				body: formData,
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}

			fetch(url,config)
			.then(response => {
				response.json()
				.then(rs => {
					console.log(rs)
					if(rs.status){
						this.$alertify.success(rs.content)
						this.clearFormData()
						this.getHistory()
						return
					}
					this.$alertify.warning('Tuvimos un error al guardar')
				})
			})
		},
		getHistory(){
			this.listHistory = []
			setTimeout(() => {
				
				const config = {
					method:'POST',
					body: {},
					headers:{
						'Authorization': 'Bearer ' + auth.getUserLogged()
					}
				}
				fetch(this.$url + `/get/history/${this.data.num_nit}`,config)
				.then((tx) => {
					tx.json()
					.then((json) => {
						if(json.status){
							this.listHistory = json.content
						}
					})
				})
			}, 500);
			this.getUserAppoinment()
		},
		clearFormData(){
			this.management = {
				appointment:'',
				status_appointment:'',
				responsible:'',
			}
		},
		exportDataFromJson(data, newFileName, fileExportType){
			if (!data) return;
			try {
			const fileName = newFileName || "exported-data";
			const exportType = exportFromJSON.types[fileExportType || "csv"];
			exportFromJSON({ data, fileName, exportType });
			} catch (e) {
				throw new Error("Parsing failed!");
			}
		},
		verifyDate(date){
			let now = new Date()
			let formatNow = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate()
			let paramDate = new Date(date)
			let formatParamDate = paramDate.getFullYear() + "-" + paramDate.getMonth() + "-" + paramDate.getDate()
			if(formatNow == formatParamDate){
				console.log(formatNow,formatParamDate)
				return true
			}
			return false
		},
		setStatusHistorial(item){
			console.log(this.management.type)
			this.management.type = item.type_management
			this.management.description = item.desc_management
			this.management.direction = item.dir_management
			if(item.appointment != null){
				this.showCalendar = true,
				this.management.appointment = item.appointment
			}
			this.id = item.id_history
		},
		validateAppointment(date){
			if(date === null){
				return false
			}
			let now = new Date()
			let formatNow = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate()
			let paramDate = new Date(date)
			let formatParamDate = paramDate.getFullYear() + "-" + paramDate.getMonth() + "-" + paramDate.getDate()
			if(formatNow > formatParamDate){
				console.log(formatNow,formatParamDate)
				return true
			}
			return false
		},
		setStatusManagament(id,state){
			let formData = new FormData()
			formData.append('id',id)
			formData.append('state',state)
			const config = {
				method:'POST',
				body: formData,
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}

			fetch(this.$url + '/set/state',config)
			.then(response => {
				response.json()
				.then(rs => {
					console.log(rs)
					if(rs.status){
						this.$alertify.success(rs.content)
						this.clearFormData()
						this.getHistory()
						return
					}
					this.$alertify.warning('Tuvimos un error al guardar')
				})
			})
		},
		setConceptHistory(id){
			let formData = new FormData()
			formData.append('id',id)
			formData.append('desc_management',this.concept)
			const config = {
				method:'POST',
				body: formData,
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}

			fetch(this.$url + '/set/concept',config)
			.then(response => {
				response.json()
				.then(rs => {
					console.log(rs)
					if(rs.status){
						this.$alertify.success(rs.content)
						this.clearFormData()
						this.getHistory()
						return
					}
					this.$alertify.warning('Tuvimos un error al guardar')
				})
			})
		},
		getUserAppoinment(){
			const config = {
				method:'POST',
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(`${this.$url}/get/user/appoinment`,config)
			.then((response) => response.json())
			.then((data) => {
					if(data.status){
						data.content.map(user => {
							let struct = {
								text:user.name,
								value:user.id,
							}
							this.users.push(struct);
						})
					}
				})
		},
		selectUser($event){
			this.management.responsible = $event
		}
	},
	components:{
		InputComponet,
		SelectComponent,
		DatePicker,
	},
}
</script>
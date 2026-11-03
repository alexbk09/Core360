<template>
    <div>
        <form  @submit="sendHistory">
            <b-row>
                <b-col cols="12">
                    <!--<SelectComponent :options="selected" :default_option="management.type" label=""/>-->
                    <label for="Tipo de gestión">Tipo de gestión</label>
                    <b-form-select v-model="management.type" :options="selected" @change="getUserAppoinment()" class="mt-3" />
                </b-col>
                <b-col cols="12">
                    <label for="">Descripción de la gestión</label>
                    <textarea class="form-control" v-model="management.description" />
                </b-col>
                <b-col cols="12">
					<div for="#">Gestión</div>
                    <b-form-select v-model="management.direction" @change="setStatus($event)" :options="dirManagement" class="mt-3" />
                </b-col>
                <b-col cols="12" v-if="showCalendar">
                    <label>Fecha de la cita</label><br>
                    <date-picker v-model="management.appointment" type="datetime" format="Y-MM-d hh:mm A"></date-picker>
                </b-col>
                <b-col cols="12" v-if="showCalendar">
                    <SelectComponent :options="users" label="Responsable" @input="selectUser($event)"/>
                </b-col>
                <b-col cols="12">
                    <SelectComponent :options="getEntity" label="Entidad" v-model="management.entity"/>
                </b-col>
                <b-col>
                    <div class="position-relative text-right mt-3">
						<button type="submit" class="btn btn-primary">Añadir agenda</button>
					</div>
                </b-col>
            </b-row>
        </form>
    </div>
</template>

<script>
import InputComponet from './InputComponet.vue';
import SelectComponent from './SelectComponent.vue';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import auth from '@/auth/auth';
import * as moment from 'moment'
import { mapActions,mapGetters, mapState } from 'vuex';

export default {
    name:'FormAppointment',
    data() {
        return {
            management:{},
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
            users:[],
			formatInput:{
				format:'Y-m-d HH:mm'
			},
			arr_entity:[]
        }
    },
    components:{
        InputComponet,
        SelectComponent,
        DatePicker
    },
    methods: {
        async sendHistory(e){
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
			formData.append('key_entity',this.management.entity)
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

			await fetch(url,config)
			.then(response => {
				response.json()
				.then(rs => {
					if(rs.status){
						this.$alertify.success(rs.content)
						this.clearFormData()
						return
					}
					this.$alertify.warning('Tuvimos un error al guardar')
				})
			})
			this.$emit('loadAppoinment',{
                change:true
            })
		},
        selectUser($event){
			this.management.responsible = $event
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
						this.users = []
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
        setStatus($event){
			this.management.direction = $event
			this.showCalendar =  $event == 1 ? true : false
            this.$emit('loadAppoinment',{
                change:true
            })
		},
		async getAllEntity(){
			await this.get()
			this.getEntity.map((ent) => {
				let struct = {
					text:ent.name_insurance,
					value: ent.id,
				}
				this.arr_entity.push(struct)
			})
		},
		...mapActions('Entity',['get']),
		clearFormData(){
			this.management = {}
		}
		
    },
    async mounted() {
		const entity = await this.getAllEntity()
    },
	computed:{
		...mapGetters('Entity',['getEntity']),
		...mapState('Entity',['entity'])
	},
}
</script>
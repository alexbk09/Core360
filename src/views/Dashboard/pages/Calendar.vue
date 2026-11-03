<template>
	<div class="container-calendar">
		<div  class="card" ref="calendar">
			<div class="card-body ">
				<div class="d-flex space-between">
					<form action="#" class="mb-5" v-if="validatePermission(20)">
						<div class="d-flex">
							<SelectComponent :options="users" label="Filtrar por usuario" @input="getEvents($event)"/>
						</div>
					</form>
					<div v-show="validatePermission(22)">
						<button class="btn btn-primary" v-b-modal.modal-1>
							Añadir Entidad 
						</button> 
						<button class="btn btn-primary" @click="viewFormAppoinment">
							Añadir Agenda
						</button> 
						<b-modal id="modal-1" hide-footer title="Creación de Entidad">
							<FormEntity @closeMoval="$bvModal.hide('modal-1')"/>
						</b-modal>
					</div>
				</div>
				<FullCalendar :options="calendarOptions" :event-sources="eventSources"/>
			</div>
		</div>
		<div class="deploy-info p-3" :class="{ active: closed }" ref="sidebar">
			<div class="text-right">
					<button class="btn" v-if="closed" @click="closedInfo">
						<b-icon-x-circle-fill />
					</button>
			</div>
			<FormAppointment v-show="formAppointment" @loadAppoinment="getScheduleAppointment()" />
			<div v-show="!formAppointment && closed === true">
				
				<h1>{{ infoEvents?.title }}</h1>
				Programada para el <strong> {{ formatDateLocale(infoEvents?.start) }} </strong>
				<br>
				Encargado: {{ infoEvents?.extendedProps != null ? infoEvents.extendedProps?.responsible : '' }}
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar, { Calendar } from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import SelectComponent from '@/components/Form/SelectComponent.vue'
import '@/assets/css/calendar.css'
import auth from '@/auth/auth'
import * as moment from 'moment'
import FormEntity from '@/components/FormEntity/FormEntity.vue'
import offCanvasVue from '@/components/Offcanvas/offCanvas.vue'
import FormAppointment from '@/components/Form/FormAppointment.vue'
import { mapGetters,mapActions,mapState } from 'vuex'

export default {
	name:'CalendarManagament',
	components:{
		FullCalendar,
		SelectComponent,
		FormEntity,
		offCanvasVue,
		FormAppointment
	},
	data() {
		return {
		calendarOptions: {
			plugins: [ dayGridPlugin, interactionPlugin,timeGridPlugin ],
			initialView: 'timeGridWeek',
			headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay'
			},
			dateClick:this.viewManagement,
			eventClick: this.viewManagement,
			eventsSet: this.handleEvents,
			events:this.eventSources,
			currentEvents: this.eventSources,
			eventDrop:this.onEventDrop,
			eventResize:this.onEventDrop, 
			editable: true,
			locale: 'es',
		},
		closed:false,
		eventSources:[],
		infoEvents:null,
		users:[],
		permission_list:false,
		formAppointment:false,
		entity:[]
		}
  },
  methods: {
	viewManagement($event){
		if(typeof $event.event === undefined){
			return
		}
		this.infoEvents = $event.event
		this.$refs.sidebar?.classList.add('active')
		this.$refs.calendar?.classList.add('active') 
		this.closed = true
	},
	viewFormAppoinment(){
		this.$refs.sidebar?.classList.add('active')
		this.$refs.calendar?.classList.add('active') 
		this.closed = true
		this.formAppointment = true
	},
	closedInfo(){
		this.$refs.sidebar?.classList.remove('active')
		this.$refs.calendar?.classList.remove('active')
		this.closed = false
		this.formAppointment = false
	},
	handleEvents(events){
		this.currentEvents = events
	},
	async getScheduleAppointment(id = ''){
		await this.getAppointment(id)
		this.eventSources = []
		if(this.appointment.length > 0){
			this.appointment.map((ap) => {
						let struct = {
							title: ap.desc_management, // a property!
							start: ap.appointment, // a property!
							end: ap.end_appointment,
							responsible: ap.fullname,
							id:ap.id_history,
							backgroundColor:this.statusColor.success,
							borderColor:this.statusColor.success
						}
						this.eventSources.push(struct);
					})
					this.calendarOptions.events = this.eventSources
					return
		}
		this.calendarOptions.events = this.eventSources
        this.$alertify.success('No tenemos registros para mostrar')
	},	
	formatDateLocale(date){
		return moment(date).format('DD/MM/YYYY HH:mm:ss')
	},
	getEvents($event){
		this.getScheduleAppointment($event)
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
	onEventDrop ({ event }) {
      //console.log(event.start,event.end,event.id)
    },
	...mapActions('Appoinment',['getAppointment'])
  },
  async mounted(){
	this.getScheduleAppointment()
	this.getUserAppoinment()
	await this.$store.dispatch('getPermission')
  },
  computed:{
		...mapGetters('Appoinment',['appointment']),
		...mapState('Appoinment',['statusColor'])
  },
}
</script>
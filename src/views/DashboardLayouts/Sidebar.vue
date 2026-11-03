<template>
	<div>
		<ul class="menu" v-if="validarPrivileges(1)" >
			<li v-b-toggle.collapse-2>
				<a href="#">
					<span><b-icon-building/> Administración </span>
				</a>
			</li>
		</ul>
		<b-collapse id="collapse-2">
			<ul class="sub-menu">
				<li v-if="validarPrivileges(8)">
					<router-link to="/user/list"> <b-icon-person /> Usuarios </router-link>
				</li>
				<li v-if="validarPrivileges(1)">
					<router-link to="/contract/list"> <b-icon-file-earmark-person /> Contratos </router-link>
				</li>
				<li v-if="validarPrivileges(11)">
					<router-link to="/rol"> <b-icon-diagram-2-fill /> Roles </router-link>
				</li>
			</ul>
		</b-collapse>
		<ul class="menu" v-if="validarPrivileges(4)">
			<li v-b-toggle.collapse-asistencial >
				<a href="#">
					<span> <b-icon-card-checklist /> Auditoria </span>
				</a>
			</li>
		</ul>
		<b-collapse id="collapse-asistencial">
			<ul class="sub-menu">
				<li v-if="validarPrivileges(4)">
					<router-link to="/contract/list/glosa"> <b-icon-list-check /> Glosa </router-link>
				</li>
				<li v-if="validarPrivileges(7)">
					<router-link to="/audit/upload"> <b-icon-cloud-upload-fill /> Carga de Facturas </router-link>
				</li>
			</ul>
		</b-collapse>
		<ul class="menu">
			<li v-b-toggle.collapse-calendar>
				<a href="#">
					<span> <b-icon-calendar3 /> Agenda </span>
				</a>
			</li>
		</ul>
		<b-collapse id="collapse-calendar">
			<ul class="sub-menu">
				<li v-if="validarPrivileges(18)">
					<router-link to="/calendar"> <b-icon-calendar2-date /> Ver Agenda </router-link>
				</li>
			</ul>
		</b-collapse>
		<ul class="menu" v-if="validarPrivileges(13)">
			<li v-b-toggle.collapse-inventario>
				<a href="#">
					<span> <b-icon-card-checklist /> Inventario </span>
				</a>
			</li>
		</ul>
		<b-collapse id="collapse-inventario">
			<ul class="sub-menu">
				<li v-if="validarPrivileges(13)">
					<router-link to="/inventory"> <b-icon-person /> Lista de inventario </router-link>
				</li>
				<li v-if="validarPrivileges(14)">
					<router-link to="/inventory/add"> <b-icon-person /> Agregar Producto </router-link>
				</li>
				<li v-if="validarPrivileges(15)">
					<router-link to="/category"> <b-icon-person /> Categorias </router-link>
				</li>
				<li v-if="validarPrivileges(16)">
					<router-link to="/inventory/personnel"> <b-icon-person /> Agregar Inventario Personal </router-link>
				</li>
				<li>
					<router-link to="/inventory/Listpersonnel"> <b-icon-person />Inventario medico</router-link>
				</li>
				<li>
					<router-link to="/inventory/Medication_order"> <b-icon-person />Solicitud de medicina</router-link>
				</li>
			</ul>
		</b-collapse>

		<ul class="menu" v-if="validarPrivileges(4)">
			<li v-b-toggle.collapse-admisiones >
				<a href="#">
					<span> <b-icon-card-checklist /> Asistencial </span>
				</a>
			</li>
		</ul>
		<b-collapse id="collapse-admisiones">
			<ul class="sub-menu">
				<li v-if="validarPrivileges(4)">
					<router-link to="/healthcare/new"> <b-icon-list-check /> Admisiones </router-link>
				</li>
			</ul>
		</b-collapse>
	</div>
</template>

<script>
import './../../assets/sidebar.css'
	export default{
		name:'SideBar',
		data(){
			return {
				permission:[]
			}
		},
		methods:{
			validarPrivileges(permission){
				var arr =  this.$store.state.permission
				let state = false
				if(arr.length > 0){
					const result = arr.filter(x => x.rol_privilegies == permission)
					result.length > 0 ? state = true : null
				}
				return state 
			}
		},
		mounted() {
			console.log(this.$store.state.permission)
		},
	}
</script>
<template>
	<div class="header">
		<div>
			<a class="btn btn-light" @click="$router.go(-1)">
				<b-icon-arrow-left-circle />
			</a> Ayect | {{ title }}
		</div>
		<div>
			<div class="dropdown">
				<input type="checkbox" name="drop" id="checked_dropdown"/>
				<label for="checked_dropdown">
					<div class="dropdown__text">
							{{ $store.state.user.name }} <img src="./../../assets/image/usuario.png" width="25" class="img-responsive" alt=""/>
					</div>
				</label>
				<ul class="dropdown__items">
				  <li> <b-icon-gear /> Mi cuenta</li>
				  <li class="divider-menu">
					<hr>
				  </li>
				  <li @click="logout"><b-icon-box-arrow-left /> Cerrar Sesión</li>
				</ul>
			</div>
			<div>
				<!-- <button class="btn btn-danger btn-sm" @click="logout()"> 
					<b-icon-box-arrow-in-left />
				</button> -->
			</div>
		</div>
	</div>
</template>
<script>

import './../../assets/header.css'
import auth from '@/auth/auth';
import imageProfile from '@/assets/image/usuario.png'

export default {
	name:'HeaderMenu',
	props: {
		title:{
			type: String,
			required: true
		},
	},
	methods: {
		logout(){
			auth.logoutSesion()
		}
	},

}
</script>
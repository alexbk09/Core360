<template>
	<div class="layouts">
		<div class="sidebar">
			<img src="@/assets/logo.gif" class="img-fluid" alt="">
			<SideBar></SideBar>
		</div>
		<div class="main">
			<HeaderMenu :title="titulo"></HeaderMenu>
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
import './../../assets/Layouts.css'
import auth from './../../auth/auth'
import HeaderMenu from './../DashboardLayouts/HeaderMenu.vue'
import SideBar from './Sidebar.vue'
export default {
	name:'DashboardLayouts',
	components:{
		HeaderMenu,
		SideBar,
	},
	data(){
		return {
			titulo:'Panel',
		}
	},
	methods:{
		confirmLogin(){
			auth.refreshToken().then((data) => {
				if(data === false){
					this.$router.push('/');
				}
			})
		},
	},
	mounted(){
		this.confirmLogin()
		this.$store.state.user = JSON.parse(localStorage.getItem('user'))
		this.$store.state.permission = JSON.parse(localStorage.getItem('privilegies'))
	},
	async beforeUpdate() {
		await this.$store.dispatch('getPermission')
		this.title = this.$route.name;
		document.title = this.title
	},
		
}
</script>
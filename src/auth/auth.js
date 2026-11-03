import Cookies from "js-cookie"
import moment from "moment"
//const url = "http://auditsalud.test/api/auth/"
const url = 'https://backend.app.aytec.com.co/api/auth/'
export default{
	setUserLogged(token){
		Cookies.set("userLogged", token);
	},
	getUserLogged() {
		return Cookies.get("userLogged");
	},
	expiresIn(time){
		var timeUpdate = moment().add(time, 'seconds');
		Cookies.set("expiresIn", timeUpdate);
	},
	async refreshToken() {
		var time = Cookies.get("expiresIn");
		if(time == undefined) {
			return false
		}
		time = new Date(time);
		if(time < Date.now()) {
			this.logoutSesion()
			return false
		}
		await fetch(url + 'refresh/token',{
			method: 'POST',
			headers:{
				'Authorization': 'Bearer ' + this.getUserLogged()
			}
		})
		.then((response) => {
			if(!response.ok){
				window.location.href = '/'
			}
			response.json()
			.then((responseData) => {
				this.setUserLogged(responseData.access_token)
				this.expiresIn(responseData.expires_in)
			})
		})
	},
	logoutSesion(){
		fetch(url + 'logout',{
			method: 'POST',
			headers:{
				'Authorization': 'Bearer ' + this.getUserLogged()
			}
		})
		.then((response) => {
			response.json()
			.then((responseData) => {
				Cookies.remove('userLogged')
				Cookies.remove('expiresIn')
				window.location.href = '/'
			})
		})
		
	},
}
<template>
	<div id="app">
		<div class="card">
			<div class="card-body">
				<h5>Suelta tu excel en esta propiedad</h5>
				<form action="">
					<FilePond
						name="upload"
						ref="pond"
						class-name="my-pond"
						label-idle="Suelte su archivo aqui..."
						:server="sendFile"
						accepted-file-types="application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
					/>
				</form>
			</div>
		</div>
	</div>
</template>


<script>
    import vueFilePond,{setOptions} from 'vue-filepond';
    import 'filepond/dist/filepond.min.css';
	import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
	import auth from './../../../auth/auth'
	import VueAlertify from 'vue-alertify';
    const FilePond = vueFilePond(FilePondPluginFileValidateType);
	export default{
		name:'UploadFile',
		data(){
			return{
				myFiles:[],
				url_server:this.$url + '/audit/upload'
			}
		},
		components: {
        	FilePond,
    	},
		methods: {
			handleFilePondInit: function () {
                console.log('FilePond has initialized');

                // example of instance method call on pond reference
                this.$refs.pond.getFiles();
            },
			verifyFiles(){
				console.log(this.myFiles)
			}
		},
		computed:{
			sendFile() {
              return {
                fetch: null,
                revert: null,
                load: null,
                restore: null,
                patch: null,
                process:async (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
					let formData = new FormData()
					formData.append('upload',file)
					let config = {
							method:'POST',
							body:formData,
							headers:{
								'Authorization': 'Bearer ' + auth.getUserLogged()
							}
					}
					let request = await fetch(this.url_server,config)
						.then((response) => {

							let resp = response.json()
							console.log(response);
							if(!response.ok){
								this.$alertify.error('Error de carga codigo: ' + response.statusText)
								error()
								return false
							}
							resp.then(responseData => {
								if(responseData.status){
									
									this.$alertify.success('Sus datos han sido cargados con exito')
									this.$router.push({
										name:'Lista de facturas',
										params:{
											radicals:responseData.content
										},
										query: this.$route.query,
										hash: this.$route.hash,
									})
									return 
								}
								this.$alertify.error(responseData.errors)
								error()
							})
					})
                    return {
                        abort: (request) => {
                            console.log(request)
                        }
                    };
					
                  }
              };
          },
		  fileCompleted(error,file){
				console.log(file)
			}
		}
	}
</script>
<template>
    <div>
        <b-container fluid>
            <form @submit="AgregarProducto">
                <b-row align-h="center">
                    <b-col align-self="center" cols="10">
                            <div class="card">
                                <div class="card-header bg-white">
                                    <h4>Información del Personal</h4>
                                </div>
                                <div class="card-body">
                                    <b-row>
                                        <b-col cols="12" lg="6">
                                            <label for="range-2">Identificacion</label>
                                            <b-form-input titulo=""  autocomplete="off" name="identification" @hit="onUsersSeleccionado" :serializer="serializarValor" @input="buscarUsers"  v-model="busquedaUser" > </b-form-input>
                                            <ul class=" autocomplete" >
                                                <li :key="row.id" v-for="row in users" @click="selecUser(row.id,row.name,row.identification)">{{row.identification}}</li>
                                            </ul>
                                        </b-col>
                                        <b-col cols="12" lg="6">
                                            <InputComponent :disabled="true" titulo="Nombre" name="name" v-model="busquedaname" />
                                        </b-col>    
                                    </b-row>
                                </div>
                            </div>
                            <div class="card mt-3 mb-3">
                                <div class="card-header bg-white">
                                    <h4>Agregar productos</h4>
                                </div>
                                <div class="card-body">
                                    <b-row align-v="center">
                                        <b-col cols="12" lg="3">
                                            <label for="range-2">Productos</label>
                                            <b-form-input titulo="Productos"  autocomplete="off" name="busqueda" @hit="onArticuloSeleccionado" :serializer="serializarValor" @input="buscarArticulos"  v-model="busqueda" > </b-form-input>
                                          <ul class=" autocomplete " >
                                             <li :key="row.id_inventory" v-for="row in articulos" @click="selecClick(row.id_inventory,row.name,row.stock,row.sku)">{{row.name}}</li>
                                          </ul>
                                        </b-col>
                                        <b-col cols="12" lg="3">
                                            <label for="range-2">Cantidad disponible</label>
                                            <b-form-input titulo="" :disabled="true" v-model="stockproduct" > </b-form-input>
                                        </b-col>
                                        <b-col cols="12" lg="3">
                                            <label for="range-2">Cantidad</label>
                                            <b-form-input titulo="" name="quantity" @input="comparar" v-model="quantity" > </b-form-input>
                                        </b-col>
                                        <b-col cols="12" lg="2">
                                            <b-button block class="mt-4" @click="addproduct" variant="info">Incluir</b-button>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col class="mt-5" cols="12">
                                            <h4>Inventario Agregado</h4>
                                            <table class="table table-striped mt-5">
                                                <thead>
                                                    <th>Sku</th>
                                                    <th>Productos</th>
                                                    <th>Cantidad</th>
                                                    <th>Accion</th>
                                                </thead>
                                                <tbody>
                                                    <tr :key="row.Sku"  v-for="(row, index) in items">
                                                        <td>{{row.Sku}}</td>
                                                        <td>{{row.Productos}}</td>
                                                        <td><input type="text" name="cantidad[]" v-model="row.Cantidad"  class="form-control"></td>
                                                        <td>
                                                            <div>
                                                                <b-button variant="danger" size="sm" @click="deleteproduct(index)"><b-icon icon="trash" font-scale="1"></b-icon></b-button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="text-right mt-3">
                                                <p id="resultado"></p>
                                                <button class="btn btn-primary" type="submit">Agregar</button>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                    </b-col>
                </b-row>
            </form> 
        </b-container>     
    </div>
  </template>

<style>
    ul.autocomplete{
     background: white;
     box-shadow: 1px 4px 15px 0px #ccc;
     list-style: none;
     margin: 0;
     padding: 0;
     border-bottom-left-radius: 10px;
     border-bottom-right-radius: 10px;
     width: 90%;
     position: absolute;
     z-index: 101;
    }
    
    ul.autocomplete > li{
        padding: 5px 10px;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
    }
    
    ul.autocomplete > li:hover{
        background: #d2d2d24d;
    }
    
    
    ul.autocomplete > li:last-child{
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
</style>
<script>
    import InputComponent from '@/components/Form/InputComponet.vue'
	import CheckboxComponent from '@/components/Form/CheckboxComponent.vue'
    import auth from '../../../auth/auth'
    import Quagga from 'quagga' // ES6
    export default {
        name: "Agg_Inventory",
        data() {
			return {
                busqueda: "",
                busquedaUser: "",
                articulos: [],
                users: [],
                articuloSeleccionado: {},
                userSeleccionado:{},
                identification:"",
                busquedaname:"",
                idproduct: "",
                stockproduct: "",
                nameproduct : "",
                quantity:"",
                sku:"",
                items: [],
                cantidad:[],
                fields: [
                    {
                        key: 'Productos',
                        sortable: true
                    },

                    {
                        key: 'Cantidad',
                        sortable: true
                    },
                    {
                        key: 'Sku',
                        sortable: true
                    },
                    {
                        key: 'Accion',
                        sortable: true
                    }
                    ],
                product:{},
                user:this.$route.params.item,
				details:[]
			}

		},
		methods:{
            deleteproduct(key){
                this.items.splice(key, 1);
            },
            addproduct(){
                if(this.quantity != "" && this.nameproduct != ""){
                    let struct = { 
						Id: this.idproduct, 
						Productos: this.nameproduct, 
						Sku: this.skuproduct,
						Cantidad: this.quantity,
						Accion:""
                    }
                    this.items.push(struct),
                    console.log(this.items.length - 1)
                    this.number = this.items.length - 1,
                    /* this.Cantidad[0]= this.quantity, */
                    this.cantidad.push(this.quantity)
                    this.idproduct= "",
                    this.stockproduct= "",
                    this.nameproduct = "",
                    this.quantity="",
                    this.sku="",
                    this.busqueda = ""


					if(this.quantity != "" && this.nameproduct != ""){
						this.repetido = 0;
						for(let i=0; i < this.items.length; i++){
						let suma =  parseInt(this.items[i].Cantidad) + parseInt(this.quantity);
							//console.log('suma '+suma +'stock '+ this.stockproduct)
							if(this.items[i].Id == this.idproduct){ 
								this.repetido = 1; 
								if(suma < this.stockproduct ){
									
								this.items[i].Cantidad = suma
								this.cantidad[i] = suma
								this.suma = 0,
								this.idproduct= "",
								this.stockproduct= "",
								this.nameproduct = "",
								this.quantity="",
								this.sku="",
								this.busqueda = ""

								}else{
									this.$alertify.error('La cantidad agregada supera el valor del inventario'); 
								} 
							}
						}
						if(this.repetido == 0){
							let struct = { 
								Id: this.idproduct, 
								Productos: this.nameproduct, 
								Sku: this.skuproduct,
								Cantidad: this.quantity,
								Accion:""
							}
							this.items.push(struct),
							//console.log(this.items.length - 1)
							this.number = this.items.length - 1,
							/* this.Cantidad[0]= this.quantity, */
							this.cantidad.push(this.quantity)
							this.suma = 0,
							this.idproduct= "",
							this.stockproduct= "",
							this.nameproduct = "",
							this.quantity="",
							this.sku="",
							this.busqueda = ""
						}

					}
				}
			},
            selecClick(id_inventory,name,stock,sku){
                this.articulos = []
                this.busqueda = name
                this.idproduct = id_inventory
                this.stockproduct = stock
                this.nameproduct = name
                this.skuproduct = sku
            },
            selecUser(id,name,identification){
                //console.log('mi resultado',id,name,identification)
                this.users = []
                this.busquedaUser = identification
                this.busquedaID = id
                this.busquedaname = name
            },
			AgregarProducto(e){
                //console.log('estoy aqui')    
                e.preventDefault();
				let formData = new FormData()
                    let product = this.product
                    formData.append('identification',this.busquedaID)
                    //product
                    formData.append('array',JSON.stringify(this.items))
                    formData.append('cantidad',this.cantidad)
					let config = {
							method:'POST',
							body:formData,
							headers:{
								'Authorization': 'Bearer ' + auth.getUserLogged()
							}
					}
					fetch(this.$url + '/add/inventory/medical',config)
						.then((response) => {
							let resp = response.json()
							resp.then(responseData => {
								 alert('Sus datos han sido cargados con exito')
								this.$router.push({
									name:'Inventario medico',
									params:{
										radicals:responseData.content
									},
									query: this.$route.query,
  									hash: this.$route.hash,
								}) 
								//this.$alertify.success('Sus datos han sido cargados')
							})
					})



			},
            comparar(){
                if(this.stockproduct < this.quantity){
                    this.$alertify.error('La cantidad asignar no puede ser mayor a la del inventario')
                    //console.log(this.quantity)
                    this.quantity = ""
                }
                //console.log(this.stockproduct)
            },
            async buscarArticulos() {
                if(this.busqueda != ""){
                   const busqueda = this.busqueda;
                    const respuesta = await fetch(this.$url  + '/get/consulter?busqueda='+busqueda);
                    const datos = await respuesta.json();
                    if(datos.status){
                        this.articulos = datos.content.data;
                        return
                    }
                    this.articulos = []
                    this.stockproduct = ""
                    this.$alertify.error(datos.errors)
                    this.articulos = datos.content.data; 
                }else{
                    this.articulos = []
                }
                
            },
            serializarValor(articulo) {
                return articulo.title + " - " + articulo.snippet;
            },
            onArticuloSeleccionado(articulo) {
                this.articuloSeleccionado = articulo;
            },
            async buscarUsers() {
                this.busquedaname = ''
                if(this.busquedaUser != "" && this.busquedaUser.length > 6){
                this.users = []
                let busqueda = this.busquedaUser;
                console.log(busqueda)
                const respuesta = await fetch(this.$url  + '/get/consulteruser?busquedaUser='+busqueda);
                const datos = await respuesta.json();
                if(datos.status){
                    this.users = datos.content.data;
                    return
                }
                this.users = []
                this.$alertify.error(datos.errors)
                }else{
                    this.users = [] 
                }
            },
            buscar(){
				
                let formData = new FormData()
                formData.append('item',this.user)
                const config = {
                    method:'POST',
                    body:formData,
                    headers:{
                        'Authorization': 'Bearer ' + auth.getUserLogged()
                    }
                }
                fetch(this.$url  + '/get/medicine_request_details',config).then((response) => {
                    response.json().then((data) => {
                   	 	console.log("🚀 ~ file: Agg_Product.vue ~ line 365 ~ response.json ~ data", data)
						if(data.status){
							data.content.map(pr => {
								let struct = { 
									Id: pr.id_product, 
									Productos: pr.name, 
									Sku: '',
									Cantidad: pr.stock,
								}
								this.items.push(struct)
								console.log("🚀 ~ file: Agg_Product.vue ~ line 373 ~ response.json ~ this.items", this.items)
								
							})
							return
							this.details = data.content
						}
                        
                    })
                })
            },
            onUsersSeleccionado(user) {
                this.userSeleccionado = user;
            }
		},
		components:{
			InputComponent,
			CheckboxComponent
		},
        created() {
            
        },
        destroyed() {
            this.$barcodeScanner.destroy()
        
        },
        mounted() {
            this.buscar()
        },
    }
  </script>
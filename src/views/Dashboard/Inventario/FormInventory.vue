<template>
    <div>
        <b-container fluid>
            <form @submit="AgregarProducto">
                <b-row>
                    <b-col cols="12" lg="8">
                            <div class="card">
                                <div class="card-header bg-white">
                                    <h4>Información del Producto</h4>
                                </div>
                                <div class="card-body">
                                    <b-row>
                                        <b-col cols="12" lg="6">
                                            <InputComponent titulo="Nombre" name="name" v-model="product.name" />
                                        </b-col>
                                        <b-col cols="12" lg="6">
                                            <InputComponent titulo="Sku" name="sku" v-model="product.sku" />
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col cols="12" lg="4">
                                            <label for="example-datepicker">Fecha de Expedición</label>
                                            <b-form-datepicker  id="" name="fexpedition" v-model="product.fexpedition" class="mb-2"></b-form-datepicker>
                                        </b-col>
                                        <b-col cols="12" lg="4">
                                            <label for="example-datepicker">Fecha de vencimiento</label>
                                            <b-form-datepicker  id="example-datepicker" name="fvencimiento" v-model="product.fvencimiento" class="mb-2"></b-form-datepicker>
                                        </b-col>
                                        <b-col cols="12" lg="4">
                                            <InputComponent titulo="Lote" name="lote" v-model="product.lote" />
                                        </b-col>
                                    </b-row>
                                    <b-row class="mt-4">
                                        <b-col cols="12">
                                            <b-form-textarea
                                                id="descripcion"
                                                v-model="product.descripcion"
                                                name="descripcion"
                                                placeholder="Descripción"
                                                
                                                ></b-form-textarea>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                            <div class="card mt-3 mb-3">
                                <div class="card-header bg-white">
                                    <h4>Seccion del producto</h4>
                                </div>
                                <div class="card-body">
                                    <b-row>
                                        <b-col cols="12" lg="6">
                                            <b-form-group id="input-group-3" label="Categorias:" label-for="input-3">
                                                <b-form-select
                                                id="input-3"
                                                v-model="product.category"
                                                :options="category"
                                                @change="filterCategoryParent"
                                                ></b-form-select>
                                            </b-form-group>
                                        </b-col>
                                        <b-col cols="12" lg="6">
                                            <b-form-group id="input-group-3" label="Sub-Categorias:" label-for="input-3">
                                                <b-form-select
                                                id="input-3"
                                                v-model="product.sub_category"
                                                :options="sub_category"
                                                
                                                ></b-form-select>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                            
                    </b-col>
                    <b-col cols="4">
                        <div class="card mb-3">
                            <div class="card-header bg-white">
                                <h4>Inventario</h4>
                            </div>
                            <div class="card-body">
                                <b-row>
                                    <b-col cols="12">
                                        <InputComponent titulo="Entrada" name="entrada" v-model="product.entrada"  />
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                            <div class="card">
                                <div class="card-header bg-white">
                                    <h4>Imagen del Producto</h4>
                                </div>
                                <div class="card-body">
                                    <b-form-file
                                        name="imagen"
                                        v-model="product.imagen"
                                        placeholder="Choose a file or drop it here..."
                                        drop-placeholder="Drop file here..."
                                        ></b-form-file>
                                        <div class="text-right mt-5">
                                            <p id="resultado"></p>
                                            <button class="btn btn-primary" type="submit">Guardar</button>
                                        </div>
                                </div>
                            </div>
							<div class="card mt-3">
								<div class="card-header bg-white">
                                    <h4>Qr Generado</h4>
                                </div>
								<div class="card-body">
									<img class="content-qr" :src="qrcode" alt="" />
								</div>
							</div>
                    </b-col>
                </b-row>
            </form> 
        </b-container>        
    </div>
  </template>

<script>
    import InputComponent from '@/components/Form/InputComponet.vue'
	import CheckboxComponent from '@/components/Form/CheckboxComponent.vue'
	import '@/assets/css/formProductsInventory.css'
    import auth from '../../../auth/auth'
    export default {
        name: "Agg_Inventory",
        data() {
			return {
				formUser:{
					rol:[]
				},
                form: {
                    email: '',
                    name: '',
                    food: null,
                    checked: []
                    },
                file1: null,
                file2: null,
                listCategory:[],
                category: [],
                sub_category: [],
                show: true,
                loading: false,
                product:{},
				qrcode: '',
			}
		},
		methods:{
			AgregarProducto(e){
                e.preventDefault();
				let formData = new FormData()
                    let product = this.product
                    formData.append('name',product.name)
                    formData.append('sku',product.sku)
                    formData.append('lote',product.lote)
                    formData.append('fexpedition',product.fexpedition)
                    formData.append('fvencimiento',product.fvencimiento)
                    formData.append('descripcion',product.descripcion)
                    formData.append('categorias',product.category)
                    formData.append('sub_Categorias',product.sub_category)
                    formData.append('entrada',product.entrada)
                    formData.append('stock',product.entrada)
                    formData.append('username',product.username)
                    formData.append('imagen',product.imagen)
					let config = {
							method:'POST',
							body:formData,
							headers:{
								'Authorization': 'Bearer ' + auth.getUserLogged()
							}
					}
					fetch(this.$url + '/add/inventory',config)
						.then((response) => {
							let resp = response.json()
							resp.then(responseData => {

								alert('Sus datos han sido cargados con exito')
								/*this.$router.push({
									name:'Lista de facturas',
									params:{
										radicals:responseData.content
									},
									query: this.$route.query,
  									hash: this.$route.hash,
								})*/
								this.$alertify.success('Sus datos han sido cargados')
								this.qrcode = responseData.image
								console.log(this.qrcode)
							})
					})
			},
            getCategory(){
                const config = {
                method:'POST',
					headers:{
						'Authorization': 'Bearer ' + auth.getUserLogged()
					}
                }
                    fetch(this.$url  + '/get/category',config).then((response) => {
                    response.json().then((data) => {
                        this.listCategory = data.content.data
                        data.content.data.map(x => {
                            if(x.id_parent == null){
                                let struct = { 
                                    text:x.name,
                                    value:x.id_category
                                }
                                console.log(struct)
                                this.category.push(struct)
                            }
                        })
                    })
                })
            },
            filterCategoryParent(){
                this.sub_category = []
                if(this.product.category != ''){
                    const sub = this.listCategory.filter(x => x.id_parent == this.product.category)
                    console.log('Me esta generando estas categorias',sub,this.product.category)
                    sub.map(x => {
                        let struct = {
                            text:x.name,
                            value:x.id_parent
                        }
                        this.sub_category.push(struct)
                        
                    })
                    return
                }
                this.sub_category = []
            },
		},
		components:{
			InputComponent,
			CheckboxComponent
		},
        created() {
            
        },
        destroyed() {
            
        },
        mounted() {
            this.getCategory()
            this.getInventory()
        },
    }
  </script>
<template>
    <div>
        <b-container fluid>
            <b-row> 
                <b-col cols="12" lg="4">
                    <form @submit="AddCategory"> 
                            <div class="card">
                                <div class="card-header bg-white">
                                    <h4>Agregar Categoria</h4>
                                </div>
                                <div class="card-body">
                                    <b-row>
                                        <b-col cols="12" >
                                            <InputComponent titulo="Nombre de la categoria" name="name" v-model="category.name" />
                                        </b-col>
                                        <b-col cols="12">
                                            <label for="textarea-large">Nombres de las sub-categorias</label>
                                            <b-form-textarea
                                                id="textarea-rows"
                                                placeholder="Separe los nombre por una coma"
                                                rows="8"
                                                v-model="category.sub_categoria"
                                            ></b-form-textarea>
                                        </b-col>
                                        <b-col cols="12">
                                            <div class="text-right mt-3">
                                                <p id="resultado"></p>
                                                <button class="btn btn-primary" type="submit">Guardar</button>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                    </form>
                </b-col> 
                <b-col cols="12" lg="8">
                    <b-card >    
                        <h3 class=" mr-2">Lista de Categorias</h3>
                        <b-table class="table" sticky-header :items="items" :fields="fields" head-variant="light" ></b-table>
                    </b-card>
                </b-col>   
            </b-row> 
        </b-container>        
    </div>
  </template>

  <style>
    .b-table-sticky-header {
        overflow-y: auto;
        max-height: 382px !important;
    }    
  </style>

<script>
    import InputComponent from '@/components/Form/InputComponet.vue'
	import CheckboxComponent from '@/components/Form/CheckboxComponent.vue'
    import auth from '../../../auth/auth'
    import Quagga from 'quagga'; // ES6
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
                category: ['Farmacia', 'Seguridad', 'Tomatoes', 'Corn'],
                sub_category: ['Medicamento', 'Casco', 'Tomatoes', 'Corn'],
                show: true,
                loading: false,
                category:{},

                fields: [
                    {
                        key: 'Id',
                        sortable: true
                    },
                    {
                        key: 'Categoria',
                        sortable: true
                    },
                    {
                        key: 'SubCategoria',
                        sortable: true
                    },
                    ],
                    items: []
                        }
		},

		methods:{
			AddCategory(e){
                e.preventDefault();
				let formData = new FormData()
                    let category = this.category
                    formData.append('name',category.name)
                    formData.append('sub_categoria',category.sub_categoria)
					let config = {
							method:'POST',
							body:formData,
							headers:{
								'Authorization': 'Bearer ' + auth.getUserLogged()
							}
					}
					fetch(this.$url + '/add/category',config)
						.then((response) => {
							let resp = response.json()
							resp.then(responseData => {
								alert('Sus datos han sido cargados con exito')
								this.getCategory()
								//this.$alertify.success('Sus datos han sido cargados')
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
                        data.content.data.map(x => {
                            let struct = { 
                                isActive: true,
                                Id: x.id_category,
                                Parent: x.id_parent,
                                Accion:'',
                            }
                            x.id_parent == null ? struct.Categoria = x.name : struct.SubCategoria = x.name, 
                            console.log(struct)
                            this.items.push(struct)
                        })
                    })
                })
            },
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
            this.getCategory()
        },
        
    }
  </script>
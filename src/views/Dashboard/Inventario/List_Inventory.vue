<template>
    <div>
        <b-container fluid  class="bv-example-row bv-example-row-flex-cols">
            <b-row align-h="end">
                <b-col align-self="end" cols="3">
                    <b-form inline class="">
                        <!-- <label class="sr-only" for="inline-form-input-name">Categorias</label>
                        <b-form-select id="inline-form-custom-select-pref" class="mb-2 mr-sm-2 mb-sm-0"
                        :options="[{ text: 'Categorias...', value: null }, 'Categorias', 'Categorias', 'Categorias']"
                        :value="null"
                        ></b-form-select> -->
                    
                        <label class="sr-only" for="inline-form-input-username">Buscar</label>
                        <b-input-group  class="mb-2 mr-sm-2 mb-sm-0">
                          <b-form-input titulo="Productos" placeholder="Buscar articulo"  autocomplete="off" name="busqueda" :serializer="serializarValor" @input="buscarArticulos"  v-model="busqueda" > </b-form-input>
                        </b-input-group>
                    </b-form>
                </b-col>
                <b-col cols="12" class="mt-4">
                    <b-card >    
                        <b-button-toolbar class="mb-5">
                            <h3 class=" mr-2">Lista de Inventario</h3>
                            <b-button-group class="mt--1">
                                <b-button title="Descargar" variant="link"><b-icon font-scale="1" icon="download" aria-hidden="true"></b-icon></b-button>
                                <!-- <b-button title="agregar entrada" v-b-modal.modal-1 ><b-icon font-scale="1" icon="cart-plus" aria-hidden="true"></b-icon></b-button>
                                <b-modal id="modal-1" title="BootstrapVue">
                                  <p class="my-4">Hello from modal!</p>
                                </b-modal> -->
                            </b-button-group>
                        </b-button-toolbar>
                        <b-table class="table" striped hover :items="items" :fields="fields">
							<template #cell(qr)="data">
								<img width="100" :src="`${data.item.qr}`" alt="">
							</template>
						</b-table>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
      </div>
</template>

<script>
import auth from '../../../auth/auth'
export default {
    name: "list-inventory",
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
            key: 'Id',
            sortable: true
          },
          {
            key: 'Producto',
            sortable: false
          },
          {
            key: 'Descripción',
            sortable: false
          },
          {
            key: 'Categoria',
            sortable: true
          },
          {
            key: 'SubCategoria',
            sortable: true
          },
          {
            key: 'Sku',
            sortable: true
          },
          {
            key: 'Lote',
            sortable: true
          },
          {
            key: 'Stock',
            sortable: true
          },
          {
            key: 'Fecha',
            sortable: true,
          },
		  {
            key: 'qr',
            sortable: false,
          }
        ],
        items: []
      }
    },
    methods: {
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
              this.items = datos.content.data; 
          }else{
              this.articulos = []
          }
          
      },
      serializarValor(articulo) {
          return articulo.title + " - " + articulo.snippet;
      },
      getInventory(){
        const config = {
          method:'POST',
          headers:{
            'Authorization': 'Bearer ' + auth.getUserLogged()
          }
        }
        fetch(this.$url  + '/get/inventory',config).then((response) => {
          response.json().then((data) => {
            data.content.data.map(x => {
            console.log("🚀 ~ file: List_Inventory.vue ~ line 105 ~ response.json ~ x", x)
				let name_sub = ''
				let name_cat = ''
				
				if(x.sub_Categorias == x.id_category){
					name_sub = x.name_category
				}
				if(x.categorias == x.id_category){
					name_cat = x.name_category
				}
				let struct = { 
					isActive: true,
					Id: x.id_inventory, 
					Producto: x.name,
					Descripción: x.descripcion, 
					Categoria: x.name_category,
					SubCategoria: name_sub,
					Sku: x.sku,
					Lote: x.lote,
					Stock: x.stock,
					Fecha: x.fvencimiento,
					Accion:'',
					qr:`${this.$link}/qrcode/${x.qr}`
				}
                this.items.push(struct)
            })
          })
        })
      }
    },
    mounted() {
      this.getInventory()
    },
  }
</script>
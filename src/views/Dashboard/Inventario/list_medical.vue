<template>
    <div>
        <b-container fluid  class="bv-example-row bv-example-row-flex-cols">
            <b-row align-h="end">
                <b-col align-self="end" cols="3">
                    <b-form inline class="">
                        <label class="sr-only" for="inline-form-input-name">Categorias</label>
                        <b-form-select id="inline-form-custom-select-pref" class="mb-2 mr-sm-2 mb-sm-0"
                        :options="[{ text: 'Categorias...', value: null }, 'Categorias', 'Categorias', 'Categorias']"
                        :value="null"
                        ></b-form-select>
                    
                        <label class="sr-only" for="inline-form-input-username">Buscar</label>
                        <b-input-group  class="mb-2 mr-sm-2 mb-sm-0">
                            <b-form-input id="inline-form-input-username" placeholder="Buscar"></b-form-input>
                        </b-input-group>

                    </b-form>
                </b-col>
                <b-col cols="12" class="mt-4">
                    <b-card >    
                        <b-button-toolbar class="mb-5">
                            <h3 class=" mr-2">Lista de Inventario del medico</h3>
                            <b-button-group class="mt--1">
                                <b-button title="Descargar" variant="link"><b-icon font-scale="1" icon="download" aria-hidden="true"></b-icon></b-button>
                            </b-button-group>
                        </b-button-toolbar>
                        <b-table class="table" striped hover :items="items" :fields="fields"></b-table>
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
            key: 'Doctor',
            sortable: false
          },

          {
            key: 'Stock',
            sortable: true
          },
          {
            key: 'Entradas',
            sortable: true
          },
          {
            key: 'Salidas',
            sortable: true
          },
          {
            key: 'Fecha',
            sortable: true,
          }
        ],
        items: []
      }
    },
    methods: {
      getInventory(){
		console.log('Linea')
        const config = {
          method:'GET',
          headers:{
            'Authorization': 'Bearer ' + auth.getUserLogged()
          }
        }
        fetch(this.$url  + '/get/inventory/lista',config).then((response) => {
          response.json().then((data) => {
            data.content.map(x => {
              let struct = { 
                    isActive: true,
                    Id: x.id_medical, 
                    Producto: x.producto,
                    Doctor: x.name, 
                    Stock: x.stock,
                    Entradas: x.entrada,
                    Salidas: x.salida,
                    Fecha: x.updated_at,
                    Accion:'',
                }
                this.items.push(struct) 
            })
            console.log("🚀 ~ file: list_medical.vue ~ line 99 ~ response.json ~ items", items)
          })
        })
      },
    },
    mounted() {
    },
  }
</script>
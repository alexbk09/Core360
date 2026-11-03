<template>
    <div>
        <b-container fluid  class="bv-example-row bv-example-row-flex-cols">
            <b-row align-h="end">
                <b-col align-self="end" cols="2">
                    <b-form inline class="">            
                        <label class="sr-only" for="inline-form-input-username">Buscar</label>
                        <b-input-group  class="mb-2 mr-sm-2 mb-sm-0">
                            <b-form-input id="inline-form-input-username" placeholder="Buscar"></b-form-input>
                        </b-input-group>

                    </b-form>
                </b-col>
                <b-col cols="12" class="mt-4">
                    <b-card >    
                        <h3 class=" mr-2">Lista de Categorias</h3>
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
    name: "list-category",
    data() {
      return {
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
    methods: {
      getCategory(){
        const config = {
          method:'POST',
          headers:{
            'Authorization': 'Bearer ' + auth.getUserLogged()
          }
        }
        fetch(this.$url  + '/get/category',config).then((response) => {
          response.json().then((data) => {
            /*data.content.data.map(x => {
              let struct = { 
                    isActive: true,
                    Id: x.id_category,
                    Parent: x.id_parent,
                    Accion:'',
                }
                x.id_parent == null ? struct.Categoria = x.name : struct.SubCategoria = x.name, 
                console.log(struct)
                this.items.push(struct)
            })*/
          })
        })
      },
    },
    mounted() {
      this.getCategory()
    },
  }
</script>
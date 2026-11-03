<template>
    <div>
        <form>
            <div class="row">
                <div class="col-lg-12">
                    <InputComponetVue titulo="Nombre de la Ips" name="name_ips" type="text" v-model="entity.name"/>
                </div>
                <div class="col-lg-12">
                    <InputComponetVue titulo="Nit" name="name_ips" type="text" v-model="entity.nit"/>
                </div>
                <div class="col-lg-12">
                    <SelectComponent :options="contract" label="Contractos" name="name_ips" type="text" v-model="entity.key_contract"/>
                </div>
                <div class="text-right col-lg-12">
                    <button type="button" @click="saveEntity" class="btn btn-primary">
                        Guardar
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import InputComponetVue from '../Form/InputComponet.vue';
import SelectComponent from '../Form/SelectComponent.vue';
import auth from '@/auth/auth';
import { mapActions, mapState } from 'vuex';

export default {
    name:'FormEntity',
    data() {
        return {
            entity:{},
            contract:[]
        }
    },
    components:{
        InputComponetVue,
        SelectComponent
    },
    methods: {
        saveEntity(){
            this.storeEntity(this.entity)
            this.$emit('closeMoval',{
                status:false
            })
        },
        getContract(){
            let config = {
                method:'POST',
                body:{},
                headers:{
                    'Authorization':'Bearer ' + auth.getUserLogged()
                }
            }

            fetch(`${this.$url}/get/contract`,config)
            .then((response) => response.json())
            .then((result) => {
                if(result.status){
                    result.content.data.map(x => {
                        let struct = {
                            text:`${x.name_comercials} - ${x.category_contract}`,
                            value: x.id_contract
                        }
                        this.contract.push(struct)
                    })
                }
            })
        },
        ...mapActions('Entity',['storeEntity'])
    },
    mounted() {
        this.getContract()
    },
}
</script>
<template>
    <div>
		<ContainerCard>
			<template v-slot:card-header>
				<h4>Datos del cliente</h4>
			</template>
			<template v-slot:card-body>
				<b-row>
					<b-col cols="12" lg="6">  
						<SelectComponent 
						   label="Tipo de identificación" 
						   default_option="Tipo de identificación"
						   :options="options"></SelectComponent>
					</b-col>
					<b-col cols="12" lg="6">
						<InputComponet titulo="N° de identificación"></InputComponet>
					</b-col>
				</b-row>
				<b-row>
					<b-col cols="12" lg="6">
						<SelectComponent label="Primer apellido"></SelectComponent>
					</b-col>
					<b-col cols="12" lg="6">
						<InputComponet titulo="Segundo apellido"></InputComponet>
					</b-col>
				</b-row>
			</template>
		</ContainerCard>
        <b-container fluid>
            <form>
                <b-row align-h="center">
                    <b-col align-self="center" cols="10" >
                        <div class="card">
                            <div class="card-header bg-white">
                                    <h4>Admisiones nuevo</h4>
                                </div>
                            <div class="card-body">
                                <b-row>
                                    <b-col cols="12" lg="6">  
                                        <SelectComponent 
                                           label="Tipo de identificación" 
                                           default_option="Tipo de identificación"
                                           :options="options"></SelectComponent>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <InputComponet titulo="N° de identificación"></InputComponet>
                                    </b-col>
                                </b-row>
                                
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <SelectComponent label="Primer nombre"></SelectComponent>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <InputComponet titulo="Segundo nombre"></InputComponet>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <SelectComponent label="Genero"></SelectComponent>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <SelectComponent label="RH"></SelectComponent>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <label for="example-datepicker">Fecha de nacimiento</label>
                                        <b-form-datepicker  id="" name="fnacimiento" class="mb-4"></b-form-datepicker>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <InputComponet titulo="Edad"></InputComponet>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <label for="example-datepicker">Fecha de ingreso</label>
                                        <b-form-datepicker  id="" name="fingreso" class="mb-4"></b-form-datepicker>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <SelectComponent label="Zona residencia"></SelectComponent>
                                    </b-col>
                                </b-row>
                                    <b-col cols="12" lg="6">
                                        <SelectComponent label="Estado civil"></SelectComponent>
                                    </b-col>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <SelectComponent label="Población de riesgo"></SelectComponent>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <SelectComponent label="Nivel educativo"></SelectComponent>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <InputComponet titulo="Dirección"></InputComponet>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <InputComponet titulo="Municipio"></InputComponet>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <InputComponet titulo="Ocupación"></InputComponet>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <InputComponet titulo="N° de teléfono"></InputComponet>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <SelectComponent label="Tipo Administradoras"></SelectComponent>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <SelectComponent label="Administradoras"></SelectComponent>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <SelectComponent label="Tipo Afiliación"></SelectComponent>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <SelectComponent label="Nivel"></SelectComponent>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <InputComponet titulo="Cuota moderadora"></InputComponet>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <InputComponet titulo="Copago"></InputComponet>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="4">
                                        <InputComponet titulo="Acompañante"></InputComponet>
                                    </b-col>
                                    <b-col cols="12" lg="4">
                                        <InputComponet titulo="parentesco"></InputComponet>
                                    </b-col>
                                    <b-col cols="12" lg="4">
                                        <InputComponet titulo="Teléfono"></InputComponet>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <InputComponet titulo="Responsable"></InputComponet>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <InputComponet titulo="Teléfono"></InputComponet>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <InputComponet titulo="En caso de emergencia llamar a"></InputComponet>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <InputComponet titulo="Teléfono"></InputComponet>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <SelectComponent label="Destinos"></SelectComponent>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <SelectComponent label="N° de camas"></SelectComponent>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <SelectComponent label="Sede de atención"></SelectComponent>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <SelectComponent label="Estado"></SelectComponent>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <SelectComponent label="Tipo cuenta"></SelectComponent>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <SelectComponent label="Grupo étnico"></SelectComponent>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" lg="6">
                                        <br>
                                        <InputComponet titulo="Autorización"></InputComponet>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-4">
                                    <b-col cols="12">
                                        <label for="">Observaciónes</label>
                                        <b-form-textarea
                                            id="observacion"
                                            name="observacion"
                                            ></b-form-textarea>
                                    </b-col>
                                </b-row>
                                <div class="text-right mt-5">
                                    <p id="resultado"></p>
                                    <button class="btn btn-primary" type="submit">Guardar</button>
                                </div>
                            </div> 
                        </div>
                    </b-col>
                </b-row>
            </form>
        </b-container>
    </div>
</template>
<script>
import InputComponet from '@/components/Form/InputComponet.vue';
import SelectComponent from '@/components/Form/SelectComponent.vue';
import ContainerCard from '@/components/ContainerCard.vue';
export default {
    name:"admin-medical",
    components: {
      'InputComponet': InputComponet,
      'SelectComponent': SelectComponent,
	  ContainerCard
    },
    data(){
        return{
            options:$store.state.type_identification
        }
    },
    methods:{
    }
}
</script>
<template>
	<div>
		<form @submit="onSubmit">
			<div class="card">
				<div class="card-body">
					<h5>Encabezado de la factura #{{ invoice.prefix }} {{ params.factnum }} - {{ invoice.type_user }}</h5>
					<hr>
					<b-row>
						<b-col cols="3">
							<InputComponent titulo="Nit" name="nit" type="text" :value="invoice.num_id" v-model="invoice.num_id" :disabled="true"/>
						</b-col>
						<b-col cols="3">
							<InputComponent titulo="Entidad" name="entity" type="text" v-model="invoice.name_insurance" :disabled="true"/>
						</b-col>
						<b-col cols="3">
							<InputComponent titulo="Fecha de la factura" name="fdate" type="text" v-model="invoice.finvoices" :disabled="true"/>
						</b-col>
						<b-col cols="3">
							<label for="#">Regimen</label>
							<b-form-select v-model="glosa.type" :options="account" class="" />
						</b-col>
					</b-row>
					<b-row>
						<b-col cols="3">
							<InputComponent titulo="Radicado" name="radicals" type="text" v-model="invoice.radicals" :disabled="true"/>
						</b-col>
						<b-col cols="3">
							<InputComponent titulo="Valor de la factura" name="valinvoice" type="text" v-model="invoice.val_invoices" :disabled="true"/>
						</b-col>
						<b-col cols="3">
							<InputComponent titulo="Descripción de glosa" name="description" type="text" v-model="invoice.desc" :readonly="true"/>
						</b-col>
						<b-col cols="3">
							<InputComponent titulo="Valor pagado" name="nit" type="number" :value="invoice.val_payment" v-model="invoice.val_payment" :disabled="true"/>
						</b-col>
					</b-row>
				</div>
				<div class="badge badge-success etiqueta-success" v-if="visible">
					Diligenciada
				</div>
			</div>
			<div class="card mt-3">
				<div class="card-body">
					<b-col cols="12">
						<div class="d-flex">
							<div class="">
								<label for="#">Tipificación
									
								</label>
								<b-form-select v-model="glosa.concept" @change="getChildTypification()" :options="options" class="typification" />
							</div>
							<div class="w-100">
								<label for="#">Descripción de tipificación
									
								</label>
								<b-form-select v-model="glosa.child_type" :options="child_options" class="child-typification" />
							</div>
							<div class="">
								<label for="#">
									Valor
								</label>
								<input type="text" class="form-control" v-model="glosa.valor_tipification" value="" name="value_tipification" />
							</div>
							<div>
								<label for="">.</label>
								<button type="button" class="btn btn-light btn-group-typification" @click="addTypification()">+</button>
							</div>
						</div>
						<div class="">
							<label for="#">
								Observación de la tipificación
							</label>
							<textarea name="observacion" v-model="glosa.observation_tpf" id="" cols="30" rows="2" class="form-control" />
						</div>
					</b-col>
					<b-col cols="12">
						<div class="mt-5">
							Lista de tipificaciones
						</div>
						<table class="table">
							<thead>
								<tr>
									<td>Tipificación</td>
									<td>Descripción</td>
									<td>Observación</td>
									<td>Valor</td>
									<td></td>
								</tr>
							</thead>
							<tbody>
								<tr :key="item.id"  v-for="(item,index) in typificationInvoice">
									<td>{{ item.name_options }}</td>
									<td>{{ item.name_child }}</td>
									<td>{{ item.observation }} </td>
									<td>{{ item.valor | number_format }} </td>
									<td><button v-if="!visible" type="button" class="btn btn-danger border-radius btn-sm" @click="deleteItemTypification(index)">x</button></td>
								</tr>
								<tr>
									<td colspan="3">Total</td>
									<td colspan="2">{{ amount | number_format }}</td>
								</tr>
								<tr>
									<td colspan="3">Diferencia</td>
									<td colspan="2">{{  parseInt(this.invoice.value_discrepancy)  - this.amount  | number_format }}</td>
								</tr>
							</tbody>
						</table>
					</b-col>
					<b-col cols="12">
						<label for="">Observación de glosa</label>
						<textarea class="form-control" v-model="glosa.observation" name="" id="" cols="30" rows="2"></textarea>
					</b-col>
				</div>
			</div>
			<div class="text-right mt-3" v-if="!visible">
				<button class="btn btn-primary" type="submit" :disabled="disabled">Guardar</button>
			</div>
			<div class="alert alert-danger mt-3" :key="err" v-for="err in errors">{{ err }}</div>
		</form>
	</div>
</template>
<style>
	.etiqueta-success{
		position: absolute;
		right: -13px;
		font-size: 18px;
		top: -14px;
	}
</style>
<script>
import auth from '../../../auth/auth'
import InputComponent from '../../../components/Form/InputComponet.vue'
import '@/assets/css/detailsGlosa.css'
export default {
	name:'DetalleGlosa',
	data() {
		return {
			params:{
				nit:this.$route.params.nit,
				factnum:this.$route.params.invoices
			},
			invoice:{
				val_payment:0
			},
			glosa:{
				accepted:0,
				accepted_ips:0,
				value_acordado:0,
				desc:''
			},
			disabled:false,
			visible:false,
			errors:[],
			amount:0,
			options:[],
			typification:[],
			child_options:[],
			account:[],
			typificationInvoice:[]
		}
	},
	components:{
		InputComponent
	},
	methods: {
		getDetails(){
			let formData = new FormData()
			formData.append('nit',this.params.nit)
			formData.append('invoice',this.params.factnum)
			const config = {
				method:'POST',
				body:formData,
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url  + '/get/detail/invoce',config).then((response) => {
				response.json().then(async (data) => {
					if(data.status) {
						this.invoice = data.content
						this.glosa.type = this.invoice.type_user
						this.invoice.val_payment = this.invoice.val_payment == null ? 0 : this.invoice.val_payment
						if(this.invoice.status == '1'){
							this.visible = true
							if(data.typification !== null){
								data.typification.map(x => this.addTypificationStruct(x))
							}
							this.getChildTypification()
							this.calculateAmount()
						}
					}
				})
			})
		},
		onSubmit(e){
			e.preventDefault()
			console.log('enviando')
			this.calculateAmount()
			if(this.amount == 0){
				this.$alertify.error('El valor debe ser mayor a cero')
				return false
			}
			let formData = new FormData()
			console.log(this.invoice)
			formData.append('arr_typification',JSON.stringify(this.typificationInvoice))
			formData.append('difference',parseInt(this.invoice.value_discrepancy)  - this.amount)
			formData.append('factnum',this.params.factnum)
			formData.append('nit',this.params.nit)
			formData.append('desc',this.invoice.desc)
			formData.append('observation',this.glosa.observation)
			formData.append('type_invoice',this.glosa.type)

			const config = {
				method:'POST',
				body:formData,
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url + '/edit/invoice',config)
			.then((response) => {
				this.errors = []
				response.json()
				.then((responseData) => {
					if(responseData.status){
						this.$alertify.success(responseData.content)
						this.visible = true
					}else{
						if(responseData.errors){
							for (const key in responseData.errors) {
									const element = responseData.errors[key];
									this.$alertify.error(element[0])
							}
							//responseData.errors.map(err => console.log(err[0]))
						}
					}
				})
			})

		},
		calculateAmount(){
			this.amount = 0
			this.typificationInvoice.map(tp => {
				this.amount += parseInt(tp.valor);
				console.log("🚀 ~ file: Detail_glosa.vue ~ line 244 ~ calculateAmount ~ this.amount", this.amount)
			})
			
			this.disabled = false
		},
		getTypification(){
			const config = {
				method:'POST',
				body:{},
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url  + '/get/typification',config).then((response) => {
				response.json().then((data) => {
					if(data.status) {
						this.typification = data.content
						this.typification.map(typification => {
							let struct = {
								text:typification.name,
								value:typification.code_type
							}
							this.options.push(struct)
						})
						
					}
				})
			})
		},
		getChildTypification(){
			let formData = new FormData()
			formData.append('code',this.glosa.concept)
			const config = {
				method:'POST',
				body:formData,
				headers:{
					'Authorization': 'Bearer ' + auth.getUserLogged()
				}
			}
			fetch(this.$url  + '/get/child/typification',config).then((response) => {
				response.json().then((data) => {
					if(data.status) {
						let child_options = data.content
						child_options.map(typification => {
							let struct = {
								text:typification.name_child,
								value:typification.code_child
							}
							this.child_options.push(struct)
						})
						
					}
				})
			})
		},
		addTypification(){
			if(!this.validateAmountTypication(this.glosa.valor_tipification)){
				return false
			}
			const child_options = this.child_options.filter(ch => {
			    return ch.value == this.glosa.child_type
			})
			console.log(this.options)
			const options = this.options.filter(op => {
			    return op.value == this.glosa.concept
			})
			let struct = {
				options:options[0].value,
				name_options: options[0].text,
				child_options:child_options[0].value,
				name_child: child_options[0].text,
				valor:this.glosa.valor_tipification,
				observation:this.glosa.observation_tpf
			}
			this.typificationInvoice.push(struct)
			this.child_options = []
			this.glosa.valor_tipification = 0
			
			this.calculateAmount(this.glosa.valor_tipification)
		},
		deleteItemTypification(id){
			this.typificationInvoice.splice(id,1);
			this.calculateAmount()
		},
		validateAmountTypication(amount){
			console.log("🚀 ~ file: Detail_glosa.vue ~ line 327 ~ validateAmountTypication ~ amount", amount)
			
			if(amount !== 0){
					let acumulate = this.amount + parseInt(amount)
					if(acumulate > parseInt( this.invoice.value_discrepancy)){             
					alert('El valor agregado supera al valor glosado')
					return false
				}
			}
			return true
		},
		addTypificationStruct(struct){
			let params = {
				options:struct.code_type,
				name_options: struct.name,
				child_options:struct.child_typification,
				name_child: struct.name_child,
				valor:struct.amount,
				observation:struct.observation

			}
			this.typificationInvoice.push(params)
			this.calculateAmount()
		},
	},
	mounted() {
		this.getDetails()
		this.getTypification()
		this.getUserAccount().then((data) => {
			data.json()
			.then((response) => {
				if(response.status){
					response.content.map(x => {
						let account = {
							text:x.concept,
							value:x.concept
						}
						this.account.push(account)
					})
				}
			})
		})
	},
}
</script>
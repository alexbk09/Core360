<template>
	<div>
		<label for="#">{{ label }}</label>
		<select name="name" id="id" class="form-control" v-model="model">
			<option 
				:selected="row.value === default_option" 
				:value="row.value" 
				:key="row.value" 
				v-for="row in options">
				{{ row.text }}
			</option>
		</select>
	</div>
</template>
<script>
export default {
	name:'SelectOption',
	props: {
		options: {
			type: Array,
			required: true
		},
		default_option: String,
		id: String,
		name: String,
		label: String,
	},
	computed:{
		model:{
			get(){
				return this.value
			},
			set(value){
				this.$emit('input',value)
			}
		}
	}
}
</script>
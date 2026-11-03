<template>
	<div>
		<div class="form-group">
			<label for="" class="w-100" v-for="row in options" :key="row.text">
				<input type="checkbox" :name="name" :value="row.value" v-model="model"> <span>{{ row.text }}</span>
			</label>
		</div>
	</div>
</template>

<script>
export default {
	name:'checkbox-component',
	props: {
		label: String,
		chekboxValue: String,
		options:Array,
		name:String,
	},
	mounted() {
		//console.log(this.chekboxValue)
	},
	computed:{
		model: {
			get(){
				return this.value
			},
			set(value){
				console.log(value)
				this.$emit('input', value)
			}
		}
	}
}
</script>
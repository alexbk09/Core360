<template>
	<div>
		<div class="form-group">
			<label for="">{{ titulo }}</label>
			<input 
				@input="handleInput" 
				@change="handleChangeInput" 
				:type="type" 
				:value="value" 
				:name="name" 
				:disabled="disabled" 
				class="form-control" 
			/>
		</div>
	</div>
</template>

<script>
export default {
	name:'InputComponent',
	props:['value'],
	props:{
		titulo:{
			type: String,
			required: true,
		},
		name:{
			type: String,
			required: true,
		},
		type:{
			type: String,
			required: false,
		},
		disabled:{
			type: Boolean,
			required: false,
		},
		value:{
			type:[String,Number],
			required: false,
		}
	},
	data() {
		return {
			content:this.value
		}
	},
	methods:{
		handleInput($event) {
			this.$emit('input',$event.target.value)
		},
		handleChangeInput($event) {
			this.$emit('input',$event.target.value)
		}
	},
}
</script>
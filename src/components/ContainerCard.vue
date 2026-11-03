<template>
	<div class="card">
		<div class="card-header">
			<slot name="card-header"></slot>
		</div>
		<div class="card-body">
			<slot name="card-body"></slot>
		</div>
	</div>
</template>

<script lang="ts">
export default{
	name:'ContainerCard',
	props:{
	},

}
</script>

<template>
	<div>
		<b-alert variant="danger" show>{{ msg }}</b-alert>
	</div>
</template>

<script>
export default {
	name:'ErrorAlert',
	props:{
		msg:{
			type: String,
			required: true,
		},
	},
	data() {
      return {
        showDismissibleAlert: false
      }
    },
}
</script>
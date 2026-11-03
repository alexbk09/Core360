<template>
	<div>
		<nav aria-label="Page navigation example">
			<ul class="pagination">
			  	<li :key="link.label+'paginate'" :class="link.active ? 'active' : ''" v-for="link in data.links" class="page-item">
					<a class="page-link"   v-html="link.label" @click="updateList(link.url)"></a>
				</li>
			</ul>
		</nav>
	</div>
</template>
<script>
export default {
	name:'Pagination',
	props:{
		data:[]
	},
	methods: {
		updateList(url){
			console.log(url)
			if(url != null){
				this.$emit('selectLink',url)
			}
		}
	},
	mounted() {
		console.log(this.data)
	},
	
}
</script>
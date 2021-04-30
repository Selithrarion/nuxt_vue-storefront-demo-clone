<template>
	<div class="product-list">
		<v-row>
			<ProductItem
				v-for="item in products"
				:key="item.id"
				:product="item"
				:small="small"
			/>
		</v-row>
	</div>
</template>

<script>
export default {
	name: 'ProductList',

	props: {
		products: {
			type: Array,
			required: true,
		},
		small: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
};
</script>

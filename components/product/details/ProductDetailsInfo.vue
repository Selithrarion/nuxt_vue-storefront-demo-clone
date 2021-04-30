<template>
	<div>
		<div class="product-details__title text-h5 mb-4 mt-16">Product details</div>

		<v-row class="justify-space-between">
			<v-col cols="12" md="6">
				<div>{{ product.description }}</div>
			</v-col>

			<v-col cols="12" md="5" class="text-capitalize body-2">
				<div>
					Activity — <b>{{ product.activity.join(', ') }}</b>
				</div>
				<div>
					Material — <b>{{ product.material.join(', ') }}</b>
				</div>
				<div>
					Gender — <b>{{ product.gender }}</b>
				</div>
				<div>
					Category — <b>{{ product.productKeywords.join(', ') }}</b>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: 'ProductDetailsInfo',

	props: {
		product: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style scoped></style>

<template>
	<div class='right-sidebar-cart-items-list'>
		<div v-if="isAnyItem">
			<RightSidebarCartItem v-for="item in items" :key="item.id" :cart-item="item" />
		</div>

		<div v-else>
			<div class="text-h6 pb-4">Your shopping cart is empty.</div>
			<div>Don't hesitate and browse our catalog to find something beautiful for you!</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RightSidebarCartItemsList',

	props: {
		items: {
			type: Array,
			required: true,
		},
		isAnyItem: {
			type: Boolean,
			required: true,
		},
	},
};
</script>

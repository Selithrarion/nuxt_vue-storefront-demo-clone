<template>
	<div>
		<div v-if="isAnyItem">
			<RightSidebarWishlistItem
				v-for="item in items"
				:key="item.id"
				:product="item"
				@remove="removeProductFromWishlist"
			/>
		</div>

		<div v-else>
			<div class="text-h6 pb-4">Your wishlist is empty.</div>
			<div>Don't hesitate and browse our catalog to find something beautiful for you!</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RightSidebarWishlistItemsList',

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

	methods: {
		removeProductFromWishlist(id) {
			this.$emit('remove', id);
		},
	},
};
</script>

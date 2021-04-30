<template>
	<div class="flex-between-center pb-12">
		<span class="text-h4">Wishlist</span>
		<CommonClearButton text="Clear wishlist" @clear="clearWishlist" />
	</div>
</template>

<script>
export default {
	name: 'RightSidebarWishlistHeader',

	methods: {
		clearWishlist() {
			this.$emit('clear');
		},
	},
};
</script>

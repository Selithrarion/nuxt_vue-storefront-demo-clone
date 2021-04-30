<template>
	<div class="right-sidebar-cart-header flex-between-center pb-12">
		<span class="right-sidebar-cart-header__title text-h4">Shopping cart</span>
		<CommonClearButton text="Clear cart" @clear="clearCart" />
	</div>
</template>

<script>
export default {
	name: 'RightSidebarCartHeader',

	methods: {
		clearCart() {
			this.$emit('clear');
		},
	},
};
</script>

<style lang="stylus" scoped>
.right-sidebar-cart-header {
  @media screen and (max-width: 600px)  {
    &__title {
      font-size: 1.5rem !important
    }
  }
}
</style>

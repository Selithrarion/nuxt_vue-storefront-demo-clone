<template>
	<v-app>
		<LayoutLeftSidebar :open="leftDrawer" @close="leftDrawer = false" />

		<LayoutAppBar
			:cart-length="cartLength"
			:wishlist-length="wishlistLength"
			:compare-length="compareLength"
			@open-left-sidebar="openLeftSidebar"
			@open-right-sidebar="openRightSidebar"
		/>

		<v-main>
			<v-container class="pb-8 pt-0">
				<nuxt />
			</v-container>
		</v-main>

		<LayoutRightSidebar :open="rightDrawer" :type="rightDrawerType" @close="rightDrawer = false" />

		<LayoutFooter />

		<CommonSnackbar />
	</v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	data() {
		return {
			leftDrawer: false,
			right: true,
			rightDrawer: false,
			rightDrawerType: 'search',
		};
	},

	computed: {
		...mapGetters({
			cartLength: 'product/cart/getCartLength',
			wishlistLength: 'product/wishlist/getWishlistLength',
			compareLength: 'product/compare/getCompareListLength',
		}),
	},

	// not created hook because i use localstorage like fake server.
	// i think better to make only one fetchUserData API call, not 3. need small refactor
	mounted() {
		this.fetchCart();
		this.fetchWishlist();
		this.fetchCompareList();
	},

	methods: {
		...mapActions({
			fetchCart: 'product/cart/fetchCart',
			fetchWishlist: 'product/wishlist/fetchWishlist',
			fetchCompareList: 'product/compare/fetchCompareList',
		}),

		openLeftSidebar() {
			this.leftDrawer = true;
		},
		openRightSidebar(type) {
			this.rightDrawer = true;
			this.rightDrawerType = type;
		},
	},
};
</script>

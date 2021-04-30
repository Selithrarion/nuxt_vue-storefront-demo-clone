<template>
	<v-app-bar height="54" color="white" fixed flat app>
		<v-col class="pa-0" cols="4">
			<v-app-bar-nav-icon @click="openLeftSidebar" />
		</v-col>

		<v-col class="pa-0" cols="4">
			<a class="flex-center" href="/">
				<img src="@/assets/svg/logo.svg" alt="Vue Storefront Logo" height="41" />
			</a>
		</v-col>

		<v-col class="d-flex justify-end flex-gap-1 pa-0" cols="4">
			<v-btn icon @click="openRightSidebar('search')">
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<CommonBadge :value="wishlistLength">
				<v-btn icon @click="openRightSidebar('wishlist')">
					<v-icon>mdi-heart</v-icon>
				</v-btn>
			</CommonBadge>

			<CommonBadge :value="compareLength">
				<v-btn icon href="/compare">
					<v-icon>mdi-compare</v-icon>
				</v-btn>
			</CommonBadge>

			<CommonBadge :value="cartLength">
				<v-btn icon @click="openRightSidebar('cart')">
					<v-icon>mdi-cart</v-icon>
				</v-btn>
			</CommonBadge>

			<v-btn icon>
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</v-col>
	</v-app-bar>
</template>

<script>
export default {
	name: 'LayoutAppBar',

	props: {
		cartLength: {
			type: Number,
			required: true,
		},
		wishlistLength: {
			type: Number,
			required: true,
		},
		compareLength: {
			type: Number,
			required: true,
		},
	},

	methods: {
		openLeftSidebar() {
			this.$emit('open-left-sidebar');
		},
		openRightSidebar(type) {
			this.$emit('open-right-sidebar', type);
		},
	},
};
</script>

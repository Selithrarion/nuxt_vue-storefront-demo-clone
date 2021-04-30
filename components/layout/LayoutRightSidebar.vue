<template>
	<v-navigation-drawer class="layout-right-sidebar" :value="open" width="790" right temporary fixed @input="update">
		<CommonCloseButton class="layout-right-sidebar__close" @click="close" />

		<div class="layout-right-sidebar__items-wrapper">
			<LazyRightSidebarSearch v-if="type === 'search'" />
			<LazyRightSidebarWishlist v-if="type === 'wishlist'" />
			<LazyRightSidebarCart v-if="type === 'cart'" @hide="close" />
		</div>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'LayoutRightSidebar',

	props: {
		open: {
			type: Boolean,
			required: true,
		},
		type: {
			type: String,
			required: true,
			validator(value) {
				return ['search', 'wishlist', 'cart'].indexOf(value) !== -1;
			},
		},
	},

	methods: {
		update(val) {
			if (val === false) this.close();
		},

		close() {
			this.$emit('close');
		},
	},
};
</script>

<style lang="stylus" scoped>
.layout-right-sidebar {
  padding-left: 64px
  transition-duration: 350ms !important
  &__close {
    position: fixed
    top: 16px
    right: 16px
    cursor: pointer
  }
  &__items-wrapper {
    padding-top: 48px
    padding-right: 64px
  }
}
</style>

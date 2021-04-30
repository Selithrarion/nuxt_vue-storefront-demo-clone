<template>
	<v-footer class="footer pa-0">
		<div class="footer__wrapper--main secondary">
			<div class="footer-main__newsletter flex-between-center">
				<span class="footer-main__subscribe-text"> Subscribe to the newsletter and receive a coupon for 10% off </span>
				<v-btn class="footer-main__subscribe-btn black-hover-btn" color="#828282a3" outlined x-large> Subscribe </v-btn>
			</div>
		</div>

		<v-divider />

		<div class="footer__wrapper--bottom">
			<span class="footer__version flex-center">v1.56</span>
			<span class="footer__links-wrapper flex-center pl-4">
				<nuxt-link class="footer__link" to="/legal"> Legal notice </nuxt-link>
				<nuxt-link class="footer__link" to="/policy">Privacy policy </nuxt-link>
			</span>
		</div>
	</v-footer>
</template>

<script>
export default {
	name: 'LayoutFooter',
};
</script>

<style lang="stylus" scoped>
.footer {
  &__wrapper {
    &--main {
      width: 100%
      padding: 8px
    }
    &--bottom {
      display: flex
      justify-content: flex-end
      background: white
      width: 100%
      height: 52px
      padding: 8px
    }
  }
  &__version {
    font-size: 0.8rem
    opacity: 0.7
  }
  &__link {
    padding-left: 4px
    color: unset
    opacity: 0.5
    text-decoration: none
  }
}

.footer-main {
  &__newsletter {
    padding: 24px 32px
  }
  &__subscribe-text {
    font-size: 1.5rem
    opacity: 0.6
  }

  &__middle {
    display: flex;
    padding: 24px 32px 16px
  }
}
</style>

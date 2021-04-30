<template>
	<v-row class="product-offers">
		<v-col class="py-0" cols="12" sm="6">
			<div class="product-offers__item product-offers__item--big" @click="showCategory(products[0].key)">
				<v-col cols="12">
					<div class="product-offers__slogan">
						{{ products[0].slogan }}
					</div>
					<div class="product-offers__type">
						{{ products[0].type }}
					</div>
				</v-col>
			</div>
		</v-col>

		<v-col class="pl-sm-0 py-0" cols="12" sm="6">
			<v-col class="product-offers__item product-offers__item--small" cols="12" @click="showCategory(products[1].key)">
				<div class="product-offers__slogan">
					{{ products[1].slogan }}
				</div>
				<div class="product-offers__type">
					{{ products[1].type }}
				</div>
			</v-col>
			<v-col class="product-offers__item product-offers__item--small" cols="12" @click="showCategory(products[2].key)">
				<div class="product-offers__slogan">
					{{ products[2].slogan }}
				</div>
				<div class="product-offers__type">
					{{ products[2].type }}
				</div>
			</v-col>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'ProductOffers',

	props: {
		products: {
			type: Array,
			required: true,
		},
	},

	methods: {
		showCategory(categoryKey) {
			this.$router.push('/category/' + categoryKey);
		},
	},
};
</script>

<style lang="stylus" scoped>
.product-offers {
  min-height: 735px
  &__item {
    background-repeat: no-repeat
    background-size: cover
    background-position: center
    text-align: center
    cursor: pointer
    transition: opacity 300ms ease
    &--big {
      height: 735px
      background-image: url('@/assets/img/banners/ban1.jpg')
    }
    &--small {
      height: 360px
      &:first-child {
        background-image: url('@/assets/img/banners/ban2.jpg')
      }
      &:nth-child(2) {
        background-image: url('@/assets/img/banners/ban3.jpg')
        margin-top: 15px
      }
    }
    &:hover {
      opacity: 0.9
    }
  }

  &__slogan {
    font-size: 3rem
    color: #4f4f4f
    padding-top: 32px
  }
  &__type {
    color: #4f4f4f
    text-transform: uppercase
    font-size: 1.3rem
    padding-bottom: 24px
  }

  @media screen and (max-width: 959px) {
    &__slogan, &__type {
      background: var(--v-secondary-base);
      opacity: 0.9
    }
  }
  @media screen and (max-width: 599px) {
    &__item--small:nth-child(2) {
      margin-top: 24px
    }
  }
}
</style>

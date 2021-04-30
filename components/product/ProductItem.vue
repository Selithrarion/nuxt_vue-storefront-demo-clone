<template>
	<v-col class="product-item" cols="12" sm="6" :md="getMdColumns" @click="showProductDetails">
		<v-card>
			<div class="product-item__actions">
				<ProductAddToWishlist class="product-item__favorite-btn" :product="product" />
				<ProductAddToCompare class="product-item__compare-btn" :product="product" />
			</div>

			<v-card-text>
				<div class="product-item__image-wrapper pa-0 mx-auto">
					<img src="@/assets/svg/placeholder.svg" alt="Product Image" height="80" width="80" />
				</div>
			</v-card-text>

			<v-card-title class="product-item__title">
				{{ product.title }}
			</v-card-title>

			<v-card-subtitle class="product-item__price text-center">
				{{ formatPrice(product.price) }}
			</v-card-subtitle>
		</v-card>
	</v-col>
</template>

<script>
  import formatPrice from '../../mixins/format/formatPrice';

export default {
	name: 'ProductItem',

  mixins: [formatPrice],

	props: {
		product: {
			type: Object,
			required: true,
		},
    small: {
      type: Boolean,
      required: false,
      default: false,
    },
	},

	computed: {
		getMdColumns() {
			if (this.small) return 3;
			else return 4;
		},
	},

	methods: {
		showProductDetails() {
			this.$router.push('/details/' + this.product.id);
		},
	},
};
</script>

<style lang="stylus" scoped>
.product-item {
  cursor: pointer

  .v-card__text {
    background-color: var(--v-secondary-base)
  }
  &__image-wrapper {
    display: flex
    align-items: center
    min-height: 200px
    width: 80px
  }

  &__title {
    display: block
    text-align: center
    opacity: 0.7
    font-size: 1rem
  }

  &__favorite-btn {
    position: absolute
    top: 4px
    right: 4px
  }
  &__compare-btn {
    position: absolute
    top: 40px
    right: 4px
  }

  ::v-deep.v-card {
    box-shadow: none !important
  }

  @media screen and (min-width: 960px) {
    &__image-wrapper {
      transition: transform 400ms ease
    }

    &__actions {
      visibility: hidden
      opacity: 0
      transition: opacity 400ms ease
    }
    &:hover {
      .product-item__actions {
        visibility: visible
        opacity: 1
      }
      .product-item__image-wrapper {
        transform: scale(1.2)
      }
    }
  }
}
</style>

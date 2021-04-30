<template>
	<v-text-field
		v-model.number="validatedQuantity"
		class="product-input-quantity"
		:value="quantity"
		:max="available"
		type="number"
		min="1"
		label="Quantity"
		hide-details
		v-on="$listeners"
		@paste.prevent
		@keydown="passOnlyPositiveNumbers"
	/>
</template>

<script>
import formatInputNumberMixin from '../../../../mixins/format/formatInputNumberMixin';

export default {
	name: 'ProductInputQuantity',

	mixins: [formatInputNumberMixin],

	props: {
		available: {
			type: Number,
			required: true,
		},
		defaultValue: {
			type: [Number, String],
			required: false,
			default: 1,
		},
	},

	data() {
		return {
			quantity: this.defaultValue,
		};
	},

	computed: {
	  // need UI/UX fix
		validatedQuantity: {
			get() {
				return this.quantity;
			},
			set(value) {
				this.quantity = value;
				if (!value) this.quantity = 1;
				if (value > this.available) this.quantity = this.available;
			},
		},
	},

	watch: {
		quantity(val) {
			this.$emit('update', val);
		},
	},
};
</script>

<style lang="stylus" scoped>
.product-input-quantity {
  display: inline-flex
  width: 50px
}
</style>

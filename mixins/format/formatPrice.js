export default {
	methods: {
		formatPrice(value, isSpace) {
			const price = Number(value).toFixed(2);
			const currency = this.$store.state.user.preferredCurrency;

			const formattedPrice = `${currency}${price}`;
			const formattedPriceWithSpace = `${currency} ${price}`;

			return isSpace ? formattedPriceWithSpace : formattedPrice;
		},
	},
};

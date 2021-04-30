export default {
	methods: {
		showSuccessNotification(text) {
			this.$store.commit('snackbar/SHOW_SUCCESS_SNACKBAR', { text });
		},

		showErrorNotification(type, text) {
			if (text) {
				this.$store.commit('snackbar/SHOW_ERROR_SNACKBAR', { text });
				return;
			}

			switch (type) {
				case 'invalid':
					return this.$store.commit('snackbar/SHOW_ERROR_SNACKBAR', { text: 'Seems you entered incorrect data' });
				default:
					return;
			}
		},
	},
};

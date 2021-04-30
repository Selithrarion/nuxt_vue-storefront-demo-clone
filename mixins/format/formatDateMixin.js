export default {
	methods: {
		formatDate(date, method) {
			if (!date) return '—';

			switch (method) {
				case 'onlyDate':
					return new Date(date).toLocaleDateString();
				case 'onlyTime':
					return new Date(date).toLocaleTimeString();
				default:
					return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString().slice(0, 5);
			}
		},
	},
};

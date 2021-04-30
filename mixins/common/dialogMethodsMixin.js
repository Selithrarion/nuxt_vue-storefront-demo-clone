export default {
	props: {
		dialogProp: {
			type: Boolean,
			required: true,
		},
	},

	data() {
		return {
			dialog: false,
		};
	},

	watch: {
		dialogProp(val) {
			this.dialog = val;
			if (val === true && this.clearData) this.clearData();
		},
	},

	methods: {
		handleDialogInputValue(value) {
			if (value === false) this.close();
		},
		close() {
			this.$emit('close');
		},
	},
};

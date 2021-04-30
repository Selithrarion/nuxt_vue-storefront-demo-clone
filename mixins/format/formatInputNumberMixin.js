const onlyNumbersInvalid = ['+', '-', '.', ',', 'e'];

export default {
	methods: {
		passOnlyNumbers(val) {
			if (onlyNumbersInvalid.includes(val.key)) val.preventDefault();
		},

		passOnlyPositiveNumbers(val) {
			this.passOnlyNumbers(val);
			if (val.target.value.length === 0 && val.key === '0') val.preventDefault();
		},
	},
};

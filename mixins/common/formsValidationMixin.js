export default {
	data() {
		return {
			rules: {
				required: (v) => !!v.trim() || 'Required field',
				requiredCheckbox: (v) => v || 'You must confirm it',
				email: (v) => !v || /.+@.+\..+/.test(v) || 'Invalid email',

				alphabetChars: (v) => /[a-zA-Z]/.test(v) || 'Only alphabet chars',

				min8chars: (v) => !v || v.length >= 8 || 'Min. 8 chars',
			},
		};
	},
};

<template>
	<v-snackbar v-model="show" :color="color" :timeout="timeout" :multi-line="multiline" right bottom>
		{{ message }}

		<template #action="{ attrs }">
			<CommonCloseButton v-bind="attrs" @click="hideSnackbar" />
		</template>
	</v-snackbar>
</template>

<script>
export default {
	name: 'CommonSnackbar',

	data() {
		return {
			show: false,
			message: null,
			color: null,
			timeout: null,
			multiline: false,
		};
	},

	methods: {
		hideSnackbar() {
			this.show = false;
		},
	},

	created() {
		this.$store.subscribe((mutation, state) => {
			const isSnackbarModule = mutation.type.split('/')[0] === 'snackbar';
			if (isSnackbarModule) {
				this.message = state.snackbar.text;
				this.color = state.snackbar.color;
				this.timeout = state.snackbar.timeout;
				this.multiline = state.snackbar.text > 100;
				this.show = true;
			}
		});
	},
};
</script>

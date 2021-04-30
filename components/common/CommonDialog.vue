<template>
	<v-dialog v-model="dialog" width="600">
		<template v-slot:activator="{ on, attrs }">
			<span v-bind="attrs" v-on="on">
				<!---->

				<slot></slot>

				<!---->
			</span>
		</template>

		<v-card>
			<v-card-title>
				<!---->
				<slot name="title">Title</slot>
				<!---->
			</v-card-title>

			<v-card-text>
				<!---->
				<slot name="content">Content</slot>
				<!---->
			</v-card-text>

			<v-card-actions>
				<v-btn text @click="close"> {{ closeText }} </v-btn>

				<v-spacer />

				<v-btn :color="confirmColor" text @click="confirm"> {{ confirmText }} </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'CommonDialog',

	props: {
		confirmColor: {
			type: String,
			required: false,
			default: 'primary',
		},
		confirmText: {
			type: String,
			required: false,
			default: 'Confirm',
		},
		closeText: {
			type: String,
			required: false,
			default: 'Close',
		},
	},

	data() {
		return {
			dialog: false,
		};
	},

	methods: {
		confirm() {
			this.$emit('confirm');
			this.close();
		},
		close() {
			this.dialog = false;
		},
	},
};
</script>

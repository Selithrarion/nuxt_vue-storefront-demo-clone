<template>
	<CommonDialog confirm-color="error lighten-3" @confirm="clear">
		<template #default>
			<v-btn class="pr-0 mr-n4 mr-sm-0" :color="iconColor" :icon="!text" :ripple="false" plain text>
				<v-icon>mdi-trash-can-outline</v-icon>
				<span v-if="text && !isMobile">{{ text }}</span>
			</v-btn>
		</template>

		<template #title> Clear </template>

		<template #content> Do you want to clear <span class="error--text text--lighten-3">all</span> items? </template>
	</CommonDialog>
</template>

<script>
export default {
	name: 'CommonClearButton',

	props: {
		text: {
			type: String,
			required: false,
			default: '',
		},
	},

	computed: {
		iconColor() {
			return this.isMobile ? 'error lighten-3' : 'grey';
		},
		isMobile() {
			return this.$vuetify.breakpoint.xs;
		},
	},

	methods: {
		clear() {
			this.$emit('clear');
		},
	},
};
</script>

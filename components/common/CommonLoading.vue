<template>
	<div class="text-center" :class="[noMargin ? 'ma-0' : 'mt-12']">
		<v-progress-circular :color="color" :size="size" :width="width" indeterminate v-bind="$attrs" />
	</div>
</template>

<script>
export default {
	name: 'CommonLoading',
	inheritAttrs: false,

	props: {
		color: {
			type: String,
			required: false,
			default: 'primary',
		},

		size: { type: Number, required: false, default: 30 },
		width: { type: Number, required: false, default: 2 },

		noMargin: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
};
</script>

<template>
	<v-badge :content="value" :value="value" :offset-x="15" :offset-y="15" bordered dot>
		<slot></slot>
	</v-badge>
</template>

<script>
export default {
	name: 'CommonBadge',

	props: {
		value: {
			type: [Number, String],
			required: true,
		},
	},
};
</script>

<style scoped></style>

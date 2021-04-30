<template>
	<v-btn v-bind="$attrs" icon v-on='$listeners'>
		<v-icon>mdi-close</v-icon>
	</v-btn>
</template>

<script>
export default {
	name: 'CommonCloseButton',
};
</script>

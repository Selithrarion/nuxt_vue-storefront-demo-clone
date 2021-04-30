<template>
	<v-breadcrumbs class="px-0" :items="items">
		<template v-slot:item="{ item }">
			<v-breadcrumbs-item :href="getItemLink(item.key)" :disabled="!item.isLink">
				{{ item.text }}
			</v-breadcrumbs-item>
		</template>
	</v-breadcrumbs>
</template>

<script>
export default {
	name: 'ProductBreadcrumbs',

	props: {
		currentName: {
			type: String,
			required: true,
		},
		categories: {
			type: Array,
			required: true,
		},
	},

	computed: {
		items() {
			if (!this.categories) return;
			let result = [];

			this.categories.forEach((category) =>
				result.push({
					text: category.name,
					key: category.key,
					isLink: true,
				})
			);
			result.push({
				text: this.currentName,
				key: this.currentName,
				isLink: false,
			});

			return result;
		},
	},

	methods: {
		getItemLink(key) {
			return '/category/' + key;
		},
	},
};
</script>

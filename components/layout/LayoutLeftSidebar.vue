<template>
	<v-navigation-drawer :value="open" temporary fixed app @input="update">
		<v-list>
			<v-list-item
				v-for="(item, i) in items"
				:key="i"
				:to="item.to"
				router
				exact
			>
				<v-list-item-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title v-text="item.title" />
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'LayoutLeftSidebar',

	props: {
		open: {
			type: Boolean,
			required: true,
		},
	},

	data() {
		return {
			items: [
				{
					icon: 'mdi-apps',
					title: 'Welcome',
					to: '/',
				},
				{
					icon: 'mdi-chart-bubble',
					title: 'Inspire',
					to: '/inspire',
				},
			],
		};
	},

	methods: {
		update(val) {
			if (val === false) this.$emit('close');
		},
	},
};
</script>

<style scoped></style>

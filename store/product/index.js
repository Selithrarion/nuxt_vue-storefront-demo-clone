import { productContent } from '../content';

export const state = () => ({
	colors: [
		{
			id: 1,
			name: 'Blue',
			color: '#4040e1',
		},
		{
			id: 2,
			name: 'Green',
			color: '#8be62e',
		},
		{
			id: 3,
			name: 'Red',
			color: '#ea3333',
		},
		{
			id: 4,
			name: 'Black',
			color: '#232323',
		},
		{
			id: 5,
			name: 'Gray',
			color: '#6d6d6d',
		},
		{
			id: 6,
			name: 'White',
			color: '#e6e6e6',
		},
	],
	sizes: [
		{
			id: 1,
			name: 'XS',
		},
		{
			id: 2,
			name: 'S',
		},
		{
			id: 3,
			name: 'M',
		},
		{
			id: 4,
			name: 'L',
		},
		{
			id: 5,
			name: 'XL',
		},
		{
			id: 6,
			name: '21',
		},
	],
});

export const actions = {
	async fetchProducts() {
		return await new Promise((res) => {
			setTimeout(() => {
				res({
					items: productContent.items.slice(0, 8),
					largeItem: productContent.largeItem,
					offersList: productContent.offersList,
				});
			}, 1000);
		});
	},

	async fetchProductByID(_, id) {
		const mockAlwaysFirstItem = productContent.items[0];
		const only8Items = productContent.items.slice(1, 9);

		return await new Promise((res) => {
			setTimeout(() => {
				res({
					product: mockAlwaysFirstItem,
					offer: only8Items,
					similar: only8Items,
				});
			}, 1000);
		});
	},

	async addReview(_, payload) {
		return await new Promise((res) => {
			setTimeout(() => {
				res();
			}, 1000);
		});
	},
};

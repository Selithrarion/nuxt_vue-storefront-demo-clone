import { productContent } from '../content';

export const actions = {
	async get(_, { search, categories }) {
		return await new Promise((res) => {
			setTimeout(() => {
				res(productContent.items);
			}, 500);
		});
	},
};

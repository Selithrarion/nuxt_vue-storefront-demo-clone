import { categoryContent } from '../content';

export const state = () => ({});

export const actions = {
	async fetchCategory(_, name) {
		return await new Promise((res) => {
			setTimeout(() => {
				res(categoryContent);
			}, 500);
		});
	},

	async fetchDataWithFilters(_, filtersObject) {
		return await new Promise((res) => {
			setTimeout(() => {
				res(categoryContent);
			}, 500);
		});
	},
};

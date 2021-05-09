export const state = () => ({
	compareList: null,
  lastUsedItemID: null,
  lastAction: null,
});

export const getters = {
	isProductInCompareList: (state) => (id) => {
	  if (!state.compareList) return
		return state.compareList.findIndex((compare) => compare.id === id) !== -1;
	},
	getCompareListLength(state) {
		return state.compareList?.length || 0;
	},
};

export const mutations = {
	SET_LIST(state, items) {
		state.compareList = items;
    localStorage.setItem('compareList', JSON.stringify(state.compareList));
	},
  CLEAR_LIST(state) {
    state.compareList = []
    state.lastAction = 'clear'
    localStorage.setItem('compareList', JSON.stringify(state.wishlist));
  },

	ADD_ITEM(state, item) {
		state.compareList.push(item);
    state.lastUsedItemID = item.id
    state.lastAction = 'add'
		// fake server storage
		localStorage.setItem('compareList', JSON.stringify(state.compareList));
	},
	REMOVE_ITEM_BY_ID(state, id) {
		state.compareList = state.compareList.filter((compare) => compare.id !== id);
    state.lastUsedItemID = id
    state.lastAction = 'remove'
		// fake server storage
		localStorage.setItem('compareList', JSON.stringify(state.compareList));
	},
};

export const actions = {
	async fetchCompareList({ commit }) {
		const fakeServerData = JSON.parse(localStorage.getItem('compareList')) || [];

		const data = await new Promise((res) => {
			setTimeout(() => {
				res(fakeServerData);
			}, 500);
		});

		commit('SET_LIST', data);
	},
	async clearCompareList({ commit }) {
    commit('SET_LIST', []);
		// await api req
	},

	async addToCompareList({ commit }, item) {
		commit('ADD_ITEM', item);

		await new Promise((res) => {
			setTimeout(() => {
				res();
			}, 500);
		});
	},
	async removeFromCompareList({ commit }, id) {
		commit('REMOVE_ITEM_BY_ID', id);

		await new Promise((res) => {
			setTimeout(() => {
				res();
			}, 500);
		});
	},
};

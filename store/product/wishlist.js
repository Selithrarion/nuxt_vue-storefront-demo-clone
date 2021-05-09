export const state = () => ({
	wishlist: null,
	lastUsedItemID: null,
	lastAction: null,
});

export const getters = {
	isProductInWishlist: (state) => (id) => {
		if (!state.wishlist) return;
		return state.wishlist.findIndex((wish) => wish.id === id) !== -1;
	},
	getWishlistLength(state) {
		return state.wishlist?.length || 0;
	},
};

export const mutations = {
	SET_LIST(state, items) {
		state.wishlist = items;
		localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
	},
	CLEAR_LIST(state) {
		state.wishlist = [];
		state.lastAction = 'clear';
		localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
	},

	ADD_ITEM(state, item) {
		state.wishlist.push(item);
		state.lastUsedItemID = item.id;
		state.lastAction = 'add';
		// fake server storage
		localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
	},
	REMOVE_ITEM_BY_ID(state, id) {
		state.wishlist = state.wishlist.filter((wish) => wish.id !== id);
		state.lastUsedItemID = id;
		state.lastAction = 'remove';
		// fake server storage
		localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
	},
};

export const actions = {
	async fetchWishlist({ commit }) {
		const fakeServerData = JSON.parse(localStorage.getItem('wishlist')) || [];

		const data = await new Promise((res) => {
			setTimeout(() => {
				res(fakeServerData);
			}, 500);
		});

		commit('SET_LIST', data);
	},
	async clearWishlist({ commit }) {
		commit('CLEAR_LIST');
		// await api req
	},

	async addToWishlist({ commit }, item) {
		commit('ADD_ITEM', item);

		await new Promise((res) => {
			setTimeout(() => {
				res();
			}, 500);
		});
	},
	async removeFromWishlist({ commit }, id) {
		commit('REMOVE_ITEM_BY_ID', id);

		await new Promise((res) => {
			setTimeout(() => {
				res();
			}, 500);
		});
	},
};

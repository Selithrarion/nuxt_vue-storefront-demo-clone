export const state = () => ({
	cartItems: [],
	lastUsedItemID: null,
	lastAction: null,

	discount: 0,
	tax: 5,
});

export const getters = {
	getTotalPrice(state, getters) {
		const subtotalPrice = getters.getSubtotalPrice;
		const discount = state.discount;
		const tax = state.tax;

		return (subtotalPrice - discount + tax).toFixed(2);
	},

	getSubtotalPrice(state) {
		let total = 0;
		if (!state.cartItems.length) return 0;

		state.cartItems.forEach((item) => {
			total += item.price * item.quantity;
		});

		return total.toFixed(2);
	},

	isProductInCart: (state) => (id) => {
    if (!state.cartItems) return
		return state.cartItems.findIndex((item) => item.id === id) !== -1;
	},
	getCartLength(state) {
		return state.cartItems?.length || 0;
	},
};

export const mutations = {
	ADD_ITEM(state, item) {
		state.cartItems.push(item);
		state.lastUsedItemID = item.id;
		state.lastAction = 'add';

		// fake server storage
		localStorage.setItem('cart', JSON.stringify(state.cartItems));
	},

	EDIT_ITEM(state, newItem) {
    if (!state.cartItems) return
		const itemIndex = state.cartItems.findIndex((item) => item.id === newItem.id);

		this._vm.$set(state.cartItems, itemIndex, newItem);

		// fake server storage
		localStorage.setItem('cart', JSON.stringify(state.cartItems));
	},
	UPDATE_QUANTITY(state, { id, newQuantity }) {
    if (!state.cartItems) return
		const itemIndex = state.cartItems.findIndex((item) => item.id === id);

		state.cartItems[itemIndex].quantity = newQuantity;

		// fake server storage
		localStorage.setItem('cart', JSON.stringify(state.cartItems));
	},

	REMOVE_ITEM_BY_ID(state, id) {
		state.cartItems = state.cartItems.filter((item) => item.id !== id);
		state.lastUsedItemID = id;
		state.lastAction = 'remove';

		// fake server storage
		localStorage.setItem('cart', JSON.stringify(state.cartItems));
	},

	SET_CART(state, items) {
		state.cartItems = items;
		localStorage.setItem('cart', JSON.stringify(state.cartItems));
	},
	CLEAR_CART(state) {
		state.cartItems = [];
		state.lastAction = 'clear';
		localStorage.setItem('cart', JSON.stringify(state.wishlist));
	},

	SET_DISCOUNT(state, discount) {
		state.discount = discount;
	},
};

export const actions = {
	async fetchCart({ commit }) {
		const fakeServerData = JSON.parse(localStorage.getItem('cart')) || [];

		const data = await new Promise((res) => {
			setTimeout(() => {
				res(fakeServerData);
			}, 500);
		});

		commit('SET_CART', data);
	},
	async clearCart({ commit }) {
		// await api req
		commit('CLEAR_CART');
	},

	async addToCart({ commit, dispatch }, item) {
		const data = await new Promise((res) => {
			setTimeout(() => {
				res({ success: Math.random() > 0.2 });
			}, 500);
		});

		if (data.success) commit('ADD_ITEM', item);
		return data.success;
	},

	async editItem({ commit, dispatch }, item) {
		const data = await new Promise((res) => {
			setTimeout(() => {
				res({ success: Math.random() > 0.2 });
			}, 500);
		});

		if (data.success) commit('EDIT_ITEM', item);
		return data.success;
	},
	async updateQuantity({ commit }, payload) {
		commit('UPDATE_QUANTITY', payload);
		await new Promise((res) => {
			setTimeout(() => {
				res();
			}, 500);
		});
	},

	async removeFromCartByID({ commit }, id) {
		const data = await new Promise((res) => {
			setTimeout(() => {
				res({ success: Math.random() > 0.1 });
			}, 500);
		});

		if (data.success) commit('REMOVE_ITEM_BY_ID', id);
		return data.success;
	},

	async validateDiscountCode({ commit }, code) {
		const { success, discount } = await new Promise((res) => {
			setTimeout(() => {
				res({
					success: Math.random() > 0.1,
					discount: Math.random() * 10,
				});
			}, 500);
		});

		if (success) commit('SET_DISCOUNT', discount);
		return success;
	},
};

const defaultSuccessTimeout = 2000;
const defaultErrorTimeout = 4000;
const defaultInfoTimeout = 5000;

export const state = () => ({
	text: null,
	timeout: null,
	color: null,
});

export const mutations = {
	SHOW_SUCCESS_SNACKBAR(state, { text, timeout }) {
		state.text = text || 'Successfully!';
		state.timeout = timeout || defaultSuccessTimeout;
		state.color = 'success';
	},
	SHOW_ERROR_SNACKBAR(state, { text, timeout }) {
		state.text = text || 'Some error happened. Try to refresh page';
		state.timeout = timeout || defaultErrorTimeout;
		state.color = 'error';
	},
	SHOW_INFO_SNACKBAR(state, { text, timeout }) {
		state.text = text;
		state.timeout = timeout || defaultInfoTimeout;
		state.color = 'info';
	},
};

export const actions = {
	showSnackbarBasedOnDataSuccess({ commit }, isSuccess) {
		const successSnackbar = () => commit('SHOW_SUCCESS_SNACKBAR', { timeout: 1000 });
		const errorSnackbar = () =>
			commit('SHOW_ERROR_SNACKBAR', { text: 'Seems Math.random() against you. Try again :)' });

		isSuccess ? successSnackbar() : errorSnackbar();
	},
};

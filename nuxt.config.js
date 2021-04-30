import colors from 'vuetify/es5/util/colors';
import ru from 'vuetify/es5/locale/ru';

export default {
	head: {
		titleTemplate: '%s - nuxt_vue-storefront-demo-clone',
		title: 'nuxt_vue-storefront-demo-clone',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	css: ['@assets/style/app.styl'],
	plugins: ['@plugins/vue-debounce'],
	components: true,
	buildModules: ['@nuxtjs/vuetify'],
	modules: [],

	vuetify: {
		customVariables: ['@assets/style/vuetify/variables.scss'],
		theme: {
			options: { customProperties: true },
			lang: {
				locales: { ru },
				current: 'ru',
			},
			themes: {
				light: {
					primary: '#4dba87',
					accent: colors.grey.darken3,
					secondary: '#f2f2f2',
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: '#ea3333',
					success: '#8be62e',
				},
			},
		},
	},
	build: {},
};

<template>
	<v-dialog v-model="dialog" width="500" @input="handleDialogInputValue">
		<v-card>
			<v-card-title>
				<span v-if="isLogin">Log in</span>
				<span v-else-if="isRegister">Register</span>
				<span v-else-if="isForgot">Reset password</span>

				<v-spacer />

				<CommonCloseButton @click="close" />
			</v-card-title>

			<!--			// TODO: убрать подсветку ff и webkit-->
			<v-card-text>
				<v-form v-model="valid" ref="form">
					<v-text-field
						v-model="email"
						:rules="[rules.required, rules.email]"
						label="Email address"
						validate-on-blur
						autofocus
					/>

					<v-text-field
						v-if="isRegister"
						v-model="firstName"
						:rules="[rules.required, rules.alphabetChars]"
						label="First name"
					/>
					<v-text-field
						v-if="isRegister"
						v-model="lastName"
						:rules="[rules.required, rules.alphabetChars]"
						label="Last name"
					/>

					<v-text-field
						v-if="isLogin || isRegister"
						v-model="password"
						:rules="[rules.required, rules.min8chars]"
						:append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
						:type="showPassword ? 'text' : 'password'"
						label="Password"
						validate-on-blur
						@click:append="showPassword = !showPassword"
					/>
					<v-text-field
						v-if="isRegister"
						v-model="repeatPassword"
						:rules="[rules.required, rules.min8chars, localRules.equalPasswords]"
						:append-icon="showRepeatPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
						:type="showRepeatPassword ? 'text' : 'password'"
						label="Repeat password"
						validate-on-blur
						@click:append="showRepeatPassword = !showRepeatPassword"
					/>

					<div v-if="isLogin" class="flex-between-center">
						<v-checkbox v-model="remember" :ripple="false" label="Remember me" />
						<span class="hover-underlined--gray pointer" @click="setType('forgot')">Forgot the password?</span>
					</div>
					<v-checkbox
						v-if="isRegister"
						v-model="acceptTerms"
						:rules="[rules.requiredCheckbox]"
						:ripple="false"
						label="I accept terms and conditions"
					/>
				</v-form>
			</v-card-text>

			<v-card-actions class="mt-4 pb-4 flex-column">
				<v-btn class="black-btn" :loading="loading" depressed block @click="submit">{{ mainButtonText }}</v-btn>

				<div class="flex-center pt-4">
					<span class="transparent-underline text--secondary">or</span>
					<span class="hover-underlined--gray pointer mx-1" @click="setAnotherActionType">
						{{ anotherActionText }}
					</span>
				</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

import loadingMixin from '../../mixins/common/loadingMixin';
import formsValidationMixin from '../../mixins/common/formsValidationMixin';
import showNotification from '../../mixins/common/showNotification';
import dialogMethodsMixin from '../../mixins/common/dialogMethodsMixin';

export default {
	name: 'AuthDialogLogin',

	mixins: [loadingMixin, formsValidationMixin, showNotification, dialogMethodsMixin],

	props: {
		defaultType: {
			type: String,
			required: true,
			validator(val) {
				return ['login', 'register', 'forgot'].indexOf(val) !== -1;
			},
		},
	},

	data() {
		return {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			repeatPassword: '',
			remember: false,
			acceptTerms: false,
			showPassword: false,
			showRepeatPassword: false,

			localRules: {
				equalPasswords: (v) => (v && v === this.password) || 'Passwords must be identical',
			},

			valid: false,
			type: this.defaultType,
		};
	},

	computed: {
		isLogin() {
			return this.type === 'login';
		},
		isRegister() {
			return this.type === 'register';
		},
		isForgot() {
			return this.type === 'forgot';
		},

		mainButtonText() {
			switch (this.type) {
				case 'login':
					return 'Log in to your account';
				case 'register':
					return 'Register an account';
				case 'forgot':
					return 'Reset password';
			}
		},
		anotherActionText() {
			switch (this.type) {
				case 'login':
					return 'register an account';
				case 'register':
					return 'login to your account';
				case 'forgot':
					return 'return to log in';
			}
		},
	},

	methods: {
		...mapActions({
			loginStore: 'user/login',
			registerStore: 'user/register',
			resetPasswordStore: 'user/resetPassword',
		}),

		async submit() {
			if (!this.valid) {
				this.showErrorNotification('invalid');
				this.$refs.form.validate();
				return;
			}

			this.startLoading();
			try {
				switch (this.type) {
					case 'login':
						await this.login();
						this.close();
						break;
					case 'register':
						await this.register();
						this.setType('verify');
						break;
					case 'forgot':
						await this.resetPassword();
						break;
				}
			} finally {
				this.stopLoading();
			}
		},

		async login() {
			const payload = {
				email: this.email,
				password: this.password,
			};
			await this.loginStore(payload);
		},

		async register() {
			const payload = {
				email: this.email,
				password: this.password,
				repeatPassword: this.repeatPassword,
				firstName: this.firstName,
				lastName: this.lastName,
			};
			await this.registerStore(payload);
		},

		async resetPassword() {
			await this.resetPasswordStore(this.email);
		},

		setAnotherActionType() {
			switch (this.type) {
				case 'login':
					return this.setType('register');
				case 'register':
					return this.setType('login');
				case 'forgot':
					return this.setType('login');
			}
		},
		setType(type) {
			this.clearData();
			this.type = type;
		},
		clearData() {
			this.email = '';
			this.firstName = '';
			this.lastName = '';
			this.password = '';
			this.repeatPassword = '';
			this.remember = false;
			this.acceptTerms = false;
			this.showPassword = false;
			this.showRepeatPassword = false;
			this.loading = false;
			this.type = this.defaultType;
			this.$nextTick(() => {
				this.$refs.form.resetValidation();
			});
		},
	},
};
</script>

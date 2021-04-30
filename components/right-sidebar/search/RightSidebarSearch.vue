<template>
	<div class="search">
		<v-text-field
			v-model="searchString"
			prepend-inner-icon="mdi-magnify"
			placeholder="Type what you are looking for..."
			v-debounce:500ms.cancelonempty="search"
		/>

		<RightSidebarSearchFilter :class="{ 'd-none': !searchData }" @update-filters="updateFilters" />

		<CommonLoading v-if="loading" />
		<ProductList v-if="searchData && !loading" :products="searchData" />

		<div v-if="isSearchNotEmptyAndLess3Symbols" class="search__info">
			Searched term should consist of at least 3 characters.
		</div>
		<div v-if="isEmptySearchData" class="search__info">No results were found.</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import loadingMixin from '../../../mixins/common/loadingMixin';

export default {
	name: 'RightSidebarSearch',

	mixins: [loadingMixin],

	data() {
		return {
			searchString: '',
			searchData: null,
			enabledFilters: null,
		};
	},

	watch: {
		enabledFilters() {
			this.search();
		},
	},

	computed: {
		isSearchNotEmptyAndLess3Symbols() {
			const searchLen = this.searchString.length;
			return searchLen > 0 && searchLen < 3;
		},
		isEmptySearchData() {
			const data = this.searchData;
			return data && !data.length;
		},
	},

	methods: {
		...mapActions({
			getSearchData: 'search/get',
		}),
		async search() {
			if (this.searchString.length < 3) {
				this.clearSearchData();
				return;
			}

			try {
				this.startLoading();

				const payload = {
					search: this.searchString,
					categories: this.enabledFilters,
				};
				this.searchData = await this.getSearchData(payload);
			} finally {
				this.stopLoading();
			}
		},

		updateFilters(value) {
			this.enabledFilters = value;
		},
		clearSearchData() {
			this.searchData = null;
		},
	},
};
</script>

<style lang="stylus" scoped>
.search {
  &__info {
    font-size: 1.1rem
    text-align: center
    padding-top: 36px
  }

  ::v-deep.v-input__prepend-inner {
    padding: 16px
    padding-left: 0
  }
  ::v-deep.v-text-field {
    margin-top: 0
    padding-top: 0
  }
  ::v-deep.v-text-field__slot {
    margin-top: 8px
  }
}
</style>

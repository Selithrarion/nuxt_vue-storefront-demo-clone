<template>
	<v-dialog v-model="dialog" width="600" @input="handleDialogInputValue">
		<v-card>
			<v-card-title class="no-wrap mb-1">
				<span class="overflow-hidden-ellipsis no-wrap">{{ review.title }}</span>

				<v-spacer />

        <CommonCloseButton @click="close" />
			</v-card-title>

			<v-card-subtitle class="overflow-hidden-ellipsis no-wrap">
				{{ review.author }}
			</v-card-subtitle>

			<v-card-text> {{ review.text }} </v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import dialogMethodsMixin from '../../../../mixins/common/dialogMethodsMixin';

export default {
	name: 'ProductReviewFullTextDialog',

  mixins: [dialogMethodsMixin],

	props: {
		review: {
			type: Object,
			required: true,
		},
	},
};
</script>

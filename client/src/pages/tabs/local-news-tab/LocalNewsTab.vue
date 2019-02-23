<template>
  <div>Local
    {{ address }}
    {{ placeId }}
    <preview-post />
  </div>
</template>

<script>
import PreviewPost from '@/components/PreviewPost';
import { mapState } from 'vuex';

export default {
  name: 'LocalNewsTab',
  components: {
    PreviewPost,
  },
  computed: {
    ...mapState('login', [
      'address',
      'placeId',
    ]),
  },
  async created() {
    await this.$store.dispatch('post/getLocalPreviewPostList', this.address);
  },
};
</script>

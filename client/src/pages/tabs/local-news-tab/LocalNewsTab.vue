<template>
  <div>Local
    {{ address }}
    {{ placeId }}
    <preview-post v-for="(previewPost, index) in localPreviewPostList"
                  :key="index"
                  :preview-post="previewPost"/>
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
    ...mapState('post', [
      'localPreviewPostList',
    ]),
  },
  async created() {
    await this.$store.dispatch('post/getLocalPreviewPostList', this.address);
  },
};
</script>

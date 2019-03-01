<template>
  <div>
    <div>
      <virtual-list :post-list="localPreviewPostList"/>
    </div>
  </div>
</template>

<script>
import PreviewPost from '@/components/PreviewPost';
import VirtualList from '@/components/VirtualList';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'LocalNewsTab',
  components: {
    PreviewPost,
    VirtualList,
  },
  computed: {
    ...mapState('post', [
      'localPreviewPostList',
    ]),
  },
  data() {
    return {
      address: this.$store.state.user.location.address,
    };
  },
  created() {
    this.initPreviewList();
    this.initDetailPost();
    this.initProfileCard();
  },
  methods: {
    ...mapMutations('post', {
      initPreviewList: 'INIT_PREVIEW_LIST',
      initDetailPost: 'INIT_DETAIL_POST',
      initProfileCard: 'INIT_PROFILE_CARD',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .local-info {
    width: 100%;
    height: 40px;
    top: 0;
  }
</style>

<template>
  <div>
    <div>
      <virtual-list :post-list="previewPostList"
                    :load-type="'local'"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

const PreviewPost = () => import('@/components/PreviewPost');
const VirtualList = () => import('@/components/VirtualList');
// const contents = () => import('@/pages/tabs-search/local-search-tab');

export default {
  name: 'PostSearchTab',
  data() {
    return {
      // inputData: this.$store.state.search.contents,
      // address: this.$store.state.search.localName,
      // userName: this.$store.state.search.userName,
    };
  },
  created() {
    this.initPreviewList();
    this.initDetailPost();
    this.initProfileCard();
    // initPreviewPostList.nickName = this.userName;
  },
  components: {
    PreviewPost,
    VirtualList,
    // contents,
  },
  computed: {
    ...mapState('post', [
      'previewPostList',
    ]),
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
</style>

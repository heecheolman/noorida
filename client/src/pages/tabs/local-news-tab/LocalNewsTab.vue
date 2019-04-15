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

const VirtualList = () => import('@/components/VirtualList');

export default {
  name: 'LocalNewsTab',
  components: {
    VirtualList,
  },
  computed: {
    ...mapState('post', [
      'previewPostList',
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

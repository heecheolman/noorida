<template>
  <div>
    <div>
      <virtual-list :post-list="subPreviewPostList"
                    :load-type="'sub'"/>
    </div>
  </div>
</template>
<script>
import VirtualList from '@/components/VirtualList';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'SubscribeNewsTab',
  components: {
    VirtualList,
  },
  created() {
    this.initSubPreviewPostList();
  },
  computed: {
    ...mapState('post', [
      'subPreviewPostList',
    ]),
  },
  methods: {
    ...mapMutations('post', {
      initSubPreviewPostList: 'INIT_SUB_PREVIEW_POST_LIST',
    }),
  },
};
</script>

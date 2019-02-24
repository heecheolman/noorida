<template>
  <a-list :loading="loading">

    <virtual-scroller :items="postList"
                      :item-height="73"
                      class="scroller"
                      v-infinite-scroll="loadMore"
                      :infinite-scroll-disabled="busy"
                      :infinite-scroll-distance="10">

      <a-list-item slot-scope="{ item }">
        <a-list-item-meta :description="item.title">
          <a slot="title">{{ item.nickName }}</a>
          <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
        </a-list-item-meta>
      </a-list-item>

    </virtual-scroller>

  </a-list>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'VirtualList',
  directives: { infiniteScroll },
  props: {
    postList: Array,
  },
  computed: {
    ...mapState('post', [
      'loading',
      'busy',
    ]),
  },
  data() {
    return {
      data: [],
      limit: 4,
    };
  },
  methods: {
    ...mapActions('post', {
      loadMore: 'loadLocalPreviewPostList',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .scroller {
    /* 120px = header + footer */
    height: calc(100vh - 120px);
  }
</style>

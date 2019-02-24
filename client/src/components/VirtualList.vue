<template>
  <a-list :loading="loading">

    <virtual-scroller :items="postList"
                      :item-height="73"
                      class="scroller"
                      v-infinite-scroll="loadMore"
                      :infinite-scroll-disabled="busy"
                      :infinite-scroll-distance="10">

      <a-list-item slot-scope="{ item }">

        <a-list-item-meta :description="item.nickName">
          <a slot="title">{{ item.title }}</a>
          <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
        </a-list-item-meta>

        <span class="timeline">{{ item.updatedAt | timeline }}</span>

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
  @import './../assets/scss/mixin/typography';

  .scroller {
    /* 120px = header + footer */
    height: calc(100vh - 120px);

    /* ant-design monkey patch */
    .ant-list-item {
      padding: 12px 10px;

      .ant-list-item-meta-title {
        @include font-size-normal;
      }
      .ant-list-item-meta-description {
        @include font-size-xx-small;
        line-height: 22px;
      }
      .ant-list-item-content {
        @include font-size-small
      }

      .timeline {
        @include font-size-small;
        color:rgba(0, 0, 0, 0.45);
      }
    }
  }
</style>

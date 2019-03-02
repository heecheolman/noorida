<template>
  <a-list :loading="loading">

    <virtual-scroller :items="postList"
                      :item-height="73"
                      class="scroller"
                      v-infinite-scroll="loadCallbackPicker"
                      :infinite-scroll-disabled="busy"
                      :infinite-scroll-distance="10">

      <a-list-item slot-scope="{ item }" @click="routeDetailPage(item.contentId)">

        <a-list-item-meta :description="item.nickName || '지역이름'">
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
    postList: {
      type: Array,
    },
    loadType: {
      type: String,
    },
  },
  computed: {
    ...mapState('post', [
      'loading',
      'busy',
    ]),
    /**
     * loadType 에 따라 스크롤링 콜백 결정
     * @returns {*}
     */
    loadCallbackPicker() {
      switch (this.loadType) {
        case 'local': return this.loadMoreLocal;
        case 'user': return this.loadMoreUser;
        default: return () => {};
      }
    },
  },
  data() {
    return {
      data: [],
      limit: 4,
    };
  },
  methods: {
    ...mapActions('post', {
      loadMoreLocal: 'loadLocalPreviewPostList',
      loadMoreUser: 'loadUserPostList',
    }),
    routeDetailPage(contentId) {
      if (contentId) {
        this.$router.push({
          name: 'PostDetailPage',
          params: { contentId },
        });
      }
    },
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

      .ant-list-item-meta {
        flex: 4;
        .ant-list-item-meta-content {
          .ant-list-item-meta-title {
            @include font-size-normal;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
            width: 55vw;
          }
          .ant-list-item-meta-description {
            @include font-size-xx-small;
            line-height: 22px;
          }
        }
      }
      .ant-list-item-content {
        .timeline {
          @include font-size-small;
          color:rgba(0, 0, 0, 0.45);
        }
      }
    }
  }
</style>

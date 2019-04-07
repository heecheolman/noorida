<template>
  <a-list>
    <div class="padding--10">
      <a-list-item v-for="item in searchPostList" :key="item.contentId" class="box-size"
                   @click="routeDetailPage(item.contentId)">
        <a-list-item-meta>
          <a slot="title" class="title">{{ item.title }}</a>
          <span slot="description" class="title-nickname">{{ item.nickName || '지역이름' }}</span>
            <a-avatar v-if="item.avatar" slot="avatar" :src="`http://localhost:3000/images/${item.avatar}`"/>
            <a-avatar v-else slot="avatar" icon="user"></a-avatar>
        </a-list-item-meta>
      </a-list-item>
    </div>
  </a-list>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

// const PreviewPost = () => import('@/components/PreviewPost');
// const VirtualList = () => import('@/components/VirtualList');
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
    // this.initPreviewList();
    // this.initDetailPost();
    // this.initProfileCard();
    // initPreviewPostList.nickName = this.userName;
    // async {
    //   const word = '충청남도 천안시 서북구 성환읍 성월리';
    //   await this.$store.dispatch('search/loadSearchPost', {
    //     word: word,
    //   });
  },
  components: {
    // PreviewPost,
    // VirtualList,
  },
  computed: {
    ...mapState('search', [
      'searchPostList',
      'loading',
    ]),
  },
  methods: {
    ...mapMutations('post', {
      // initPreviewList: 'INIT_PREVIEW_LIST',
      // initDetailPost: 'INIT_DETAIL_POST',
      // initProfileCard: 'INIT_PROFILE_CARD',
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
  .title{
    font-size: 15px;
    /*font-weight: bold;*/
  }
  .title-nickname{
    font-size: 13px;
  }
  .padding--10{
    padding: 10px;
  }
</style>

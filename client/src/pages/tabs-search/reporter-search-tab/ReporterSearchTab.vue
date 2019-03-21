<template>
  <a-list class="padding--10">
    <!--<a-list-item :key="data.id" v-for="data in reportUserList">-->
    <a-list-item v-for="users in reportUserList" :key="users.id">
      <div  @click="routeUserProfile">
        <a-avatar v-if="profileCard.avatar" :src="`http://localhost:3000/images/${profileCard.avatar}`"></a-avatar>
        <a-avatar v-else icon="user"></a-avatar>
        <!--<span  class="text-center">{{ data.reportNickname }}</span>-->
        <span  class="text-center design-name">{{ users.reportNickname }}</span>
      </div>
      <div class="button-common">
        <!--<div class="subscript-button-wrap flex-container flex-center-sort" v-if="!isMe">-->
          <a-button v-show="!isSubscribe"
                    type="primary"
                    size="small"
                    class="button-common">구독하기
          </a-button>
          <a-button v-show="isSubscribe"
                    size="small"
                    class="button-common">구독중
          </a-button>
      </div>
      <!--</div>-->
    </a-list-item>
  </a-list>
</template>

<script>
import { mapState } from 'vuex';
import AListItem from 'ant-design-vue/es/list/Item';

const PreviewPost = () => import('@/components/PreviewPost');
const VirtualList = () => import('@/components/VirtualList');
// const contents = () => import('@/pages/tabs-search/local-search-tab');

export default {
  name: 'ReporterSearchTab',
  data() {
    return {
      reportUserList: this.$store.state.search.reportUserList,
      // profileCard: this.$store.state.post.profileCard,
      // inputData: this.$store.state.search.contents,
      // address: this.$store.state.search.localName,
      // // userName: this.$store.state.search.userName,
      // mockList: [
      //   { id: 1, mockNickname: 'joeminji' },
      //   { id: 2, mockNickname: 'joyunji' },
      //   { id: 3, mockNickname: 'hahahahaha' },
      // ],
    };
  },
  // created() {
  //   this.initPreviewList();
  //   this.initDetailPost();
  //   this.initProfileCard();
  //   // initPreviewPostList.nickName = this.userName;
  // },
  components: {
    AListItem,
    PreviewPost,
    VirtualList,
    // contents,
  },
  computed: {
    ...mapState('post', [
      'previewPostList',
      'profileCard',
    ]),
    ...mapState('anotherUser', [
      'info',
      'readerList',
      'reporterList',
      'localList',
      'isSubscribe',
      'reliabilityScore',
    ]),
  },
  methods: {
    // ...mapMutations('post', {
    //   initPreviewList: 'INIT_PREVIEW_LIST',
    //   initDetailPost: 'INIT_DETAIL_POST',
    //   initProfileCard: 'INIT_PROFILE_CARD',
    // }),
    async routeUserProfile() {
      // this.$router.push({
      //   name: 'ProfilePage',
      //   params: { userId: this.profileCard.userId },
      // });
      console.log('프로필 페이지로 이동할것');
    },
  },
};
</script>

<style lang="scss" scoped>
  .button-common{
    text-align: right;
    float: right;
    flex: auto;
    height: 30px;
  }
  .design-icon{
    font-size: 30px;
    /* margin-right: 10px; */
    padding-left: unset;
    margin-right: 20px;
  }
  .padding--10{
    padding: 10px;
  }
  .design-name {
    margin-left: 25px;
    font-weight: bold;
  }
</style>

<template>
  <a-list class="padding--10">
    <!--<a-list-item :key="data.id" v-for="data in reportUserList">-->
    <a-list-item v-for="users in reportUserList" :key="users.userId" >
      <div @click="routeUserProfile(users.userId)">
        <a-avatar v-if="profileCard.avatar" :src="`http://localhost:3000/images/${profileCard.avatar}`"></a-avatar>
        <a-avatar v-else icon="user"></a-avatar>
        <!--<span  class="text-center">{{ data.reportNickname }}</span>-->
        <span  class="text-center design-name">{{ users.nickName }}</span>
      </div>
      <div class="button-common" >
      <div v-if="!isMe">
        <a-button v-show="!isSubscribe"
                  type="primary"
                  size="small"
                  @click="subscribeReporter">구독하기
        </a-button>
        <a-button v-show="isSubscribe"
                  size="small"
                  @click="cancelSubscribeReporter">구독중
        </a-button>
      </div>
      <div v-if="isMe">
        <a-button>저입니다^^</a-button>
      </div>
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
  created() {
    // this.initPreviewList();
    // this.initDetailPost();
    // this.initProfileCard();
    // initPreviewPostList.nickName = this.userName;
    console.log('모르는 아이디', this.$store.state.user.user.userId);
  },
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
      'localList',
      'isSubscribe',
    ]),
    ...mapState('search', [
      'reportUserList',
    ]),
    isMe() {
      return this.info.userId === this.$store.state.user.user.userId;
    },
  },
  methods: {
    // ...mapMutations('post', {
    //   initPreviewList: 'INIT_PREVIEW_LIST',
    //   initDetailPost: 'INIT_DETAIL_POST',
    //   initProfileCard: 'INIT_PROFILE_CARD',
    // }),
    async subscribeReporter() {
      const payload = {
        me: this.$store.state.user.user.userId,
        another: this.info.userId,
      };
      await this.$store.dispatch('anotherUser/subscribeReporter', payload);
      const userId = this.isMe ? this.user.userId : this.info.userId;
      await this.$store.dispatch('anotherUser/fetchSubscribeList', {
        fetchType: 'readers', userId,
      });
    },
    async cancelSubscribeReporter() {
      const payload = {
        me: this.$store.state.user.user.userId,
        another: this.info.userId,
      };
      await this.$store.dispatch('anotherUser/cancelSubscribeReporter', payload);
      const userId = this.isMe ? this.user.userId : this.info.userId;
      await this.$store.dispatch('anotherUser/fetchSubscribeList', {
        fetchType: 'readers', userId,
      });
    },
    async routeUserProfile(itemUserId) {
      if (itemUserId) {
        this.$router.push({
          name: 'ProfilePage',
          params: { userId: itemUserId },
        });
      }
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
    font-size: 15px;
  }
</style>

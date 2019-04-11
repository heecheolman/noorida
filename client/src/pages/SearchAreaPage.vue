<template>
  <div>
    <toolbar :title="'검색'" />
    <div class="">
      <div class="design-card text-center">
        <!--{{ LOCAL_NAME }}-->
        {{ localNameTag }}
      </div>
      <!--<div class="button-common">-->
        <!--<a-button >구독</a-button>-->
      <!--</div>-->

      <div class="button-common">
        <a-button v-show="!isSubscribeLocal"
                  type="primary"
                  size="default"
                  @click="subscribeLocal">구독하기
        </a-button>
        <a-button v-show="isSubscribeLocal"
                  size="default"
                  @click="cancelSubscribeLocal">구독중
        </a-button>
      </div>








      <!--<div class="margin&#45;&#45;10">-->
        <!--<virtual-list :post-list="previewPostList"-->
                      <!--:load-type="'local'"/>-->
      <!--</div>-->


    <a-list :loading="loading">
      <div class="padding--10">
        <a-list-item v-for="item in searchLocalPostList" :key="item.contentId" class="box-size"
                     @click="routeDetailPage(item.contentId)">
          <a-list-item-meta>
            <a slot="title" class="title">{{ item.title }}</a>
            <!--<span slot="description" class="title-nickname">{{ item.nickName || '지역이름' }}</span>-->
            <a-avatar v-if="item.avatar" slot="avatar" :src="`http://localhost:3000/images/${item.avatar}`"/>
            <a-avatar v-else slot="avatar" icon="user"></a-avatar>
          </a-list-item-meta>
        </a-list-item>
      </div>
    </a-list>


    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

const Toolbar = () => import('@/components/Toolbar');
// const PreviewPost = () => import('@/components/PreviewPost');
const VirtualList = () => import('@/components/VirtualList');

export default {
  name: 'SearchAreaPage',
  components: {
    Toolbar,
    // PreviewPost,
    VirtualList,
  },
  props: {
    localId: {
      type: Number,
    },
    localName: {
      type: String,
    },
    userId: {
      type: Number,
    },
  },
  computed: {
    ...mapState('post', [
      // 'previewPostList',
    ]),
    ...mapState('anotherUser', [
      'localList',
      // 'isSubscribe',
    ]),
    ...mapState('search', [
      // 'loadLocalData',
      // 'localList',
      'searchLocalPostList',
      'loading',
    ]),
  },
  data() {
    return {
      address: this.$store.state.user.address,
      localNameTag: '',
    };
  },
  async created() {
    //this.localNameTag = this.localName.substring(this.localName.length - 4); // 이거 고칠필요 있음!!!
    this.localNameTag = this.localName.substring(this.localName.lastIndexOf(" ")); // 이거 고칠필요 있음!!!
    await this.$store.dispatch('search/loadSearchLocalPost', {
      localId: this.localId,
      // userId:  this.$store.state.user.user.userId,
    });
    this.initSubscriptLocal();
  },
  methods: {
    ...mapMutations('post', {
      // initPreviewList: 'INIT_PREVIEW_LIST',
      // initDetailPost: 'INIT_DETAIL_POST',
      // initProfileCard: 'INIT_PROFILE_CARD',
    }),
    // isSubscribe() {
    //   for (let i=0; i < this.localList.length; i++){
    //     if (this.localList[i].reader === userId){
    //
    //       return true;
    //     }
    //   }
    //   return false;
    //   },
    async initSubscriptLocal(){
      let user = this.$store.state.user.user.userId;
      await this.$store.dispatch('anotherUser/fetchSubscribeList', {
        fetchType: 'locals', userId : user,
      });
    },
    isSubscribeLocal() {
      for (let i=0; i < this.localList.length; i++){
        if (this.localList[i].localId === this.localId){
          return true;
        }
      }
      return false;
    },
    async subscribeLocal(){
      let user = this.$store.state.user.user.userId;
      await this.$store.dispatch('anotherUser/subscribeLocal', {
        reader: user,
        localId: this.localId,
      });
      await this.$store.dispatch('anotherUser/fetchSubscribeList', {
        fetchType: 'locals', userId: user,
      });
    },
    async cancelSubscribeLocal(){
      let user = this.$store.state.user.user.userId;
      await this.$store.dispatch('anotherUser/cancelSubscribeLocal', {
        reader: user,
        localId: this.localId,
      });
      await this.$store.dispatch('anotherUser/fetchSubscribeList', {
        fetchType: 'locals', userId: user,
      });
    },
  },
};
</script>

<style scoped>

  .margin--10{
    margin: 15px;
  }
  .design-card{
    margin: 60px auto 20px auto;
    width: 110px;
    background-color: #6299ff;
    border-radius: 100px;
    height: 110px;
    font-size: 26px;
    color: white;
    line-height: 4.3;
  }
  .button-common{
    text-align: center;
  }
</style>

<template>
  <div>
    <toolbar :title="'검색'" />
    <div class="margin--10">
      <div class="design-card text-center">
        {{ localNameTag }}
      </div>
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
      <a-list :loading="loading">
        <div class="padding--10">
          <a-list-item v-for="item in searchLocalPostList.result"
                       :key="item.contentId" class="box-size"
                       @click="routeDetailPage(item.contentId)">
            <a-list-item-meta>
              <a slot="title" class="title">{{ item.title }}</a>
              <span slot="description" class="title-nickname">{{ item.nickName }}</span>
              <a-avatar v-if="item.avatar" slot="avatar" :src="`/images/${item.avatar}`"/>
              <a-avatar v-else slot="avatar" icon="user"></a-avatar>
            </a-list-item-meta>
          </a-list-item>
        </div>
      </a-list>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
const Toolbar = () => import('@/components/Toolbar');
export default {
  name: 'SearchAreaPage',
  components: {
    Toolbar,
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
    ...mapState('search', [
      'searchLocalPostList',
      'loading',
    ]),
    ...mapState('anotherUser', [
      'isSubscribeLocal',
    ]),
  },
  data() {
    return {
      address: this.$store.state.user.address,
      localNameTag: '',
      myUserId: this.$store.state.user.user.userId,
    };
  },
  async created() {
    this.initIsSubscribeLocal();
    this.localNameTag = this.localName.substring(this.localName.lastIndexOf(' '));
    await this.$store.dispatch('search/loadSearchLocalPost', {
      localId: this.localId,
      userId: this.myUserId,
    });
  },
  methods: {
    async initIsSubscribeLocal() {
      await this.$store.dispatch('anotherUser/isSubscribeLocal', {
        reader: this.myUserId,
        localId: this.localId,
      });
    },
    async subscribeLocal() {
      await this.$store.dispatch('anotherUser/subscribeLocal', {
        reader: this.myUserId,
        localId: this.localId,
      });
    },
    async cancelSubscribeLocal() {
      await this.$store.dispatch('anotherUser/cancelSubscribeLocal', {
        reader: this.myUserId,
        localId: this.localId,
      });
    },
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

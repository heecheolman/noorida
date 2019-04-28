<template>
  <a-list class="padding--10">
    <a-list-item v-for="users in reportUserList" :key="users.userId" >
      <div @click="routeUserProfile(users.userId)">
        <a-avatar v-if="users.avatar" :src="`http://localhost:3000/images/${users.avatar}`"></a-avatar>
        <a-avatar v-else icon="user"></a-avatar>
        <span  class="text-center design-name">{{ users.nickName }}</span>
      </div>
      <div class="button-common" >
        <div v-if="users.userId !== myUserID">
          <a-button v-show="!isSubscribe(users.userId)"
                    type="primary"
                    size="default"
                    @click="subscribeReporter(users.userId)">구독하기
          </a-button>
          <a-button v-show="isSubscribe(users.userId)"
                    size="default"
                    @click="cancelSubscribeReporter(users.userId)">구독중
          </a-button>
        </div>
      </div>
    </a-list-item>
  </a-list>

</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'ReporterSearchTab',
    data() {
      return {
        myUserID: this.$store.state.user.user.userId,
      };
    },
    computed: {
      ...mapState('user', [
        'user',
      ]),
      ...mapState('post', [
        'previewPostList',
        'profileCard',
      ]),
      ...mapState('anotherUser', [
        'info',
        'reporterList',
      ]),
      ...mapState('search', [
        'reportUserList',
      ]),
    },
    created() {
      this.initSubscribeUser();
    },
    methods: {
      async initSubscribeUser() {
        const userId = this.user.userId;
        await this.$store.dispatch('anotherUser/fetchSubscribeList', {
          fetchType: 'reporters',userId,
        });
      },
      isSubscribe(userId) {
        for (let i = 0; i < this.reporterList.length; i++) {
          if (this.reporterList[i].userId === userId) {
            return true;
          }
        }
        return false;
      },
      async subscribeReporter(paramUserId) {
        const payload = {
          me: this.user.userId,
          another: paramUserId,
        };
        await this.$store.dispatch('anotherUser/subscribeReporter', payload);
        const userId = this.user.userId;
        await this.$store.dispatch('anotherUser/fetchSubscribeList', {
          fetchType: 'reporters', userId,
        });
      },
      async cancelSubscribeReporter(paramUserId) {
        const payload = {
          me: this.user.userId,
          another: paramUserId,
        };
        await this.$store.dispatch('anotherUser/cancelSubscribeReporter', payload);
        const userId = this.user.userId;
        await this.$store.dispatch('anotherUser/fetchSubscribeList', {
          fetchType: 'reporters', userId,
        });
      },
      async routeUserProfile(itemUserId) {
        if (itemUserId) {
          this.$router.push({
            name: 'ProfilePage',
            params: { userId: itemUserId },
          });
        }
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

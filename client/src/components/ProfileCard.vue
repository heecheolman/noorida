<template>
  <div class="profile-card-container flex-container flex-row">
    <div class="user-icon-wrap">
      <div class="medal flex-container flex-center-sort">
        <i class="fas fa-medal"></i>
      </div>
      <div class="avatar-wrap flex-container flex-center-sort">
        <img class="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
        <!--{{ user.avatar }}-->
      </div>
    </div>
    <div class="user-info-wrap flex-container flex-column">
      <div class="user-nickname">
        {{ user.nickName }} <span class="reporter">리포터</span>
      </div>
      <div class="user-description">
        {{ user.description }}
        <span v-if="user.description">{{ user.description }}</span>
        <span v-else>설명 없음</span>
        <!--Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProfileCard',
  computed: {
    ...mapState('user', [
      'user',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';
  @import './../assets/scss/theme/colors';

  .profile-card-container {
    margin: 10px 0;
    padding: 10px;
    width: 100%;
    height: auto;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    border-radius: 7px;

    .user-icon-wrap {
      margin: 0 10px;
      padding-top: 10px;
      flex: 1;

      .medal {
        width: 100%;
        height: auto;
        margin-bottom: 5px;
        color: $medal-gold;
      }

      .avatar-wrap {

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 32px;
        }
      }
    }

    .user-info-wrap {
      flex: 9;

      .user-nickname {
        @include font-size-large;
        @include font-weight-6;
        color: $primary;

        .reporter {
          @include font-size-small;
          color: $info-blur;
        }
      }

      .user-description {
        @include font-size-normal;
        @include font-weight-4;
        color: $info-blur;
      }
    }
  }
</style>

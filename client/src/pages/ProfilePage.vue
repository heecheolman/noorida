<template>
  <div class="profile-container">
    <toolbar :title="'프로필'" />
    <div class="user-header-section flex-container flex-column">
      <div class="medal-wrap flex-container flex-center-sort">
        <i class="fas fa-medal medal"></i>
      </div>
      <div class="avatar-wrap flex-container flex-center-sort">
        <img class="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
      </div>
      <div class="nickname-wrap text-center">
        <span class="nickname">{{ info.nickName }}</span>
      </div>
      <div class="description-wrap text-justify">
        <!--<span class="description">{{ info.description }}</span>-->
        <span class="description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const Toolbar = () => import('@/components/Toolbar');

export default {
  name: 'ProfilePage',
  components: {
    Toolbar,
  },
  props: {
    userId: {
      type: Number,
    },
  },
  computed: {
    ...mapState('anotherUser', [
      'info',
    ]),
  },
  async created() {
    await this.$store.dispatch('anotherUser/fetchAnotherUser', this.userId);
  },
};
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/mixin';
  @import './../assets/scss/theme/colors';
  .profile-container {
    width: 100%;
    height: 100%;
    padding: 50px 10px 20px;/* toolbar height */
    overflow-y: scroll;

    .user-header-section {
      @include box-shadow;
      width: 100%;
      padding: 15px;

      .medal-wrap {
      }

      .avatar-wrap {
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 100px;
        }
      }

      .nickname-wrap {
        @include v-text-align(40px);

        .nickname {
          @include font-size-large;
          @include font-weight-5;
          color: $primary;
        }
      }
      .description-wrap {
        .description {
          @include font-size-small;
          color: $info;
        }
      }
    }
  }
</style>

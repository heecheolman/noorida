<template>
  <div class="profile-container">
    <toolbar :title="'프로필'" />
    <div class="user-header-section flex-container flex-column">
      <div class="medal-wrap flex-container flex-center-sort">
        <i class="fas fa-medal medal"></i>
      </div>
      <div class="score-wrap text-center">
        <span class="score">475</span>
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
      <div class="badge-wrap flex-container flex-between-sort flex-row">
        <a-badge :count="1000"
                 :overflow-count="999"
                 :numberStyle="badgeStyle">
          <div class="badge-box text-center">Readers</div>
        </a-badge>
        <a-badge :count="99"
                 :overflow-count="999"
                 :numberStyle="badgeStyle">
          <div class="badge-box text-center">Reporter</div>
        </a-badge>
        <a-badge :count="9999"
                 :overflow-count="999"
                 :numberStyle="badgeStyle">
          <div class="badge-box text-center">Locals</div>
        </a-badge>
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
  data() {
    return {
      badgeStyle: { backgroundColor: '#1F74FF' },
    };
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
      padding: 15px 25px;

      .medal-wrap {
        .medal {
          color: $medal-silver;
        }
      }

      .score-wrap {
        @include v-text-align(25px);
        .score {
          @include font-size-regular;
          @include font-weight-5;
          color: $info;
        }
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

      .badge-wrap {
        margin: 15px 0;
        padding: 10px;

        .badge-box {
          @include v-text-align(40px);
          width: 20vw;
          height: 40px;
          border: 1px solid #eee;
          border-radius: 4px;
          cursor: pointer;
          transition: 0.2s ease-in-out;
        }
        .badge-box:hover {
          transform: translateY(-2px);
        }
      }
    }
  }
</style>

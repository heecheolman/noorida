<template>
  <div class="profile-card-container flex-container flex-row" @click="routeUserProfile">
    <div class="user-icon-wrap">
      <div class="medal flex-container flex-center-sort">
        <i class="fas fa-medal medal" :class="medalColorPicker"></i>
      </div>
      <div class="avatar-wrap flex-container flex-center-sort">
        <a-avatar v-if="profileCard.avatar" :src="`http://localhost:3000/images/${profileCard.avatar}`"></a-avatar>
        <a-avatar v-else icon="user"></a-avatar>
      </div>
    </div>
    <div class="user-info-wrap flex-container flex-column">
      <div class="user-nickname">
        {{ profileCard.nickName }} <span class="reporter">리포터</span>
      </div>
      <div class="user-description">
        <span v-if="profileCard.description">{{ profileCard.description }}</span>
        <span v-else>설명 없음</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProfileCard',
  computed: {
    ...mapState('post', [
      'profileCard',
      'reliabilityScore',
    ]),
    medalColorPicker() {
      switch (parseInt(this.reliabilityScore / 100, 10)) {
        case 0: case 1: return 'medal-bronze';
        case 2: case 3: return 'medal-silver';
        default: return 'medal-gold';
      }
    },
  },
  async created() {
    await this.$store.dispatch('post/getUserReliabilityScore');
  },
  methods: {
    async routeUserProfile() {
      this.$router.push({
        name: 'ProfilePage',
        params: { userId: this.profileCard.userId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/mixin';
  @import './../assets/scss/theme/colors';

  .profile-card-container {
    @include box-shadow;
    margin: 10px 0;
    padding: 10px;
    width: 100%;
    height: auto;

    .user-icon-wrap {
      margin: 0 10px;
      padding-top: 10px;
      flex: 1;

      .medal {
        margin-bottom: 5px;
      }

      .avatar-wrap {
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

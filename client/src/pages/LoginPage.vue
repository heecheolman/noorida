<template>
  <div class="page flex-container flex-center-sort">
    <div class="login-box">
      <h1 class="title text-center">누리다</h1>
      <div class="input-box flex-container flex-center-sort flex-column">
        <div class="flex-container flex-center-sort margin--bottom-20">
          <vs-input
            size="large"
            placeholder="아이디"
            v-model="id" />
        </div>
        <div class="flex-container flex-center-sort margin--bottom-20">
          <vs-input
            size="large"
            type="password"
            placeholder="패스워드"
            v-model="password" />
        </div>
        <div class="flex-container flex-center-sort margin--bottom-20">
          <vs-button class="button-common" color="primary" type="flat">로그인</vs-button>
        </div>
        <div class="flex-container flex-center-sort margin--bottom-20">
          <vs-button class="button-common" color="primary" type="flat">회원가입</vs-button>
        </div>
        <div class="flex-container flex-center-sort margin-bottom-20">
          <label><span class="keep-login">로그인 유지</span></label>
          <vs-switch v-model="keepLogin"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      id: '',
      password: '',
      keepLogin: false,
    };
  },
};
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';
  @import './../assets/scss/variables/colors';

  .login-box {
    width: 100%;
    height: 80%;
    padding: 20px;

    .title {
      @include font-size-xx-large();
      color: $primary;
    }

    .input-box {
      margin: 0 auto;
      max-width: 80%;
      min-height: 70%;
      width: 100%;
      height: auto;

      .keep-login {
        margin-right: 10px;
        color: rgb(30, 30, 30);
        @include font-size-xxx-small();
        @include v-text-align(30px);
      }

      .button-common {
        min-width: 200px;
      }
    }

  }
</style>

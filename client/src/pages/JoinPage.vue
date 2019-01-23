<template>
  <div class="page flex-container flex-center-sort">
    <div class="join-box">
      <h1 class="title text-center">회원가입</h1>
        <div class="input-box flex-container flex-center-sort flex-column">
          <div class="input-item-wrap flex-container flex-center-sort">
            <vs-input
              :success="true"
              val-icon-success="done"
              success-text="좋은 이름이에요!"
              placeholder="이름을 입력하세요"
              v-model="realName"/>
          </div>
          <div class="input-item-wrap flex-container flex-center-sort">
            <vs-input
              :success="true"
              val-icon-success="done"
              success-text="좋은 닉네임이에요!"
              placeholder="닉네임을 입력하세요"
              v-model="nickName"/>
          </div>
          <div class="input-item-wrap flex-container flex-center-sort">
            <vs-input
              :success="true"
              val-icon-success="done"
              type="password"
              placeholder="비밀번호 입력"
              v-model="password"/>
          </div>
          <div class="input-item-wrap flex-container flex-center-sort">
            <vs-input
              :success="true"
              val-icon-success="done"
              type="password"
              success-text="일치해요!"
              placeholder="비밀번호 확인 입력"
              v-model="confirmPassword"/>
          </div>
          <div class="input-item-wrap flex-container flex-center-sort">
            <vs-input
              style="width: 150px;"
              placeholder="email@email.email"
              v-model="email"/>
            <vs-button
              @click="sendMail()"
              style="width: 40px; margin-left: 10px; height: 27px;"
              size="small"
              color="primary"
              type="border">인증</vs-button>
          </div>
          <div class="input-item-wrap flex-container flex-center-sort">
            <vs-input
              :success="true"
              val-icon-success="done"
              style="width: 150px;"
              placeholder="C O D E"
              v-model="secureKey"/>
            <vs-button
              style="width: 40px; margin-left: 10px; height: 27px;"
              size="small"
              color="primary"
              type="border">확인</vs-button>
          </div>
          <div class="navigation-box">
            <div class="flex-container flex-center-sort margin--bottom-10">
              <vs-button
                class="button-common"
                color="primary"
                type="flat">회원가입</vs-button>
            </div>
            <div class="flex-container flex-center-sort margin--bottom-10">
              <vs-button
                :to="{ name: 'LoginPage' }"
                class="button-common"
                color="primary"
                type="flat">뒤로가기</vs-button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinPage',
  data() {
    return {
      realName: '',
      nickName: '',
      password: '',
      confirmPassword: '',
      email: '',
      secureKey: '',
    };
  },
  methods: {
    async sendMail() {
      this.$http.post('/api/send-mail', { email: this.email })
        .then(result => console.log(result))
        .catch(err => console.error(err));
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';
  @import './../assets/scss/variables/colors';

  .join-box {
    width: 100%;
    height: 80%;
    padding: 20px;

    .title {
      @include font-size-x-large();
      color: $primary;
      margin-bottom: 10px;
    }

    .input-box {
      margin: 0 auto;
      max-width: 80%;
      min-height: 70%;
      width: 100%;
      height: auto;

      .input-item-wrap {
        width: 250px;
        height: 45px;
      }
    }

    .navigation-box {
      margin-top: 10px;
      width: 100%;
      height: 70px;

      .button-common {
        min-width: 200px;
      }
    }

  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

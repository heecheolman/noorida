<template>
  <div class="page flex-container flex-center-sort">
    <div class="join-box">
      <h1 class="title text-center">회원가입</h1>
        <div class="input-box flex-container flex-center-sort flex-column">
          <div class="input-item-wrap flex-container flex-center-sort">
            <vs-input
              name="realName"
              v-validate="{ required: true, regex: /^[가-힝]{2,}$/ }"
              :success="!errors.has('realName')"
              :danger="errors.has('realName')"
              success-text="좋은 이름이에요!"
              danger-text="이름은 2~4글자로 해주세요!"
              val-icon-success="done"
              val-icon-danger="clear"
              placeholder="이름"
              v-model="realName"/>
          </div>
          <div class="input-item-wrap flex-container flex-center-sort">
            <vs-input
              name="nickName"
              v-validate="{ required: true, regex: /[a-z0-9]/ }"
              :success="!errors.has('nickName')"
              :danger="errors.has('nickName')"
              val-icon-success="done"
              val-icon-danger="clear"
              success-text="좋은 닉네임이에요!"
              danger-text="4~22 글자이내, 특수문자 언더바(_), 마침표(.), 영문 대소문자만 가능합니다."
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
              :success="!errors.has('email')"
              :danger="errors.has('email')"
              val-icon-success="done"
              val-icon-danger="clear"
              name="email"
              v-validate="{ required: true, regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ }"
              placeholder="email@email.email"
              v-model="email"/>
          </div>
          <div class="navigation-box">
            <div class="flex-container flex-center-sort margin--bottom-10">
              <vs-button
                @click="joinUser()"
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
    };
  },
  methods: {
    joinUser() {
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

<template>
  <div class="page flex-container flex-center-sort">
    <div class="join-box">
      <h1 class="title text-center">회원가입</h1>
        <div class="input-box flex-container flex-center-sort flex-column">
          <div class="input-item-wrap flex-container flex-center-sort">
            <vs-input
              name="realName"
              v-validate.initial="{
                required: true,
                regex: /^[가-힝]{2,}$/,
              }"
              :success="!errors.has('realName')"
              :danger="errors.has('realName')"
              danger-text="유효하지 않은 이름이에요!"
              val-icon-success="done"
              val-icon-danger="clear"
              placeholder="이름"
              v-model="realName"/>
          </div>
          <div class="input-item-wrap flex-container flex-center-sort">
            <vs-input
              name="nickName"
              v-validate.initial="{
                required: true,
                regex: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,21}$/
              }"
              :success="!errors.has('nickName')"
              :danger="errors.has('nickName')"
              danger-text="유효하지 않은 닉네임이에요!"
              val-icon-success="done"
              val-icon-danger="clear"
              placeholder="닉네임"
              v-model="nickName"/>
          </div>
          <div class="input-item-wrap flex-container flex-center-sort">
            <vs-input
              name="password"
              v-validate.initial="{
                required: true,
                regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/
              }"
              :success="!errors.has('password')"
              :danger="errors.has('password')"
              danger-text="대소문자, 특수문자, 숫자가 적어도 1글자, 10글자이상 필요합니다"
              val-icon-success="done"
              val-icon-danger="clear"
              type="password"
              placeholder="비밀번호"
              ref="password"
              v-model="password"/>
          </div>
          <div class="input-item-wrap flex-container flex-center-sort">
            <vs-input
              name="confirmPassword"
              v-validate.initial="'required|confirmed:password'"
              :success="!errors.has('confirmPassword') && !errors.has('password')"
              :danger="errors.has('confirmPassword') || errors.has('password')"
              danger-text="비밀번호가 일치하지 않습니다"
              val-icon-success="done"
              val-icon-danger="clear"
              data-vv-as="password"
              type="password"
              placeholder="비밀번호 확인"
              v-model="confirmPassword"/>
          </div>
          <div class="input-item-wrap flex-container flex-center-sort">
            <vs-input
              name="email"
              v-validate.initial="{
                required: true,
                regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
              }"
              :success="!errors.has('email')"
              :danger="errors.has('email')"
              danger-text="이메일형식이 아닙니다"
              val-icon-success="done"
              val-icon-danger="clear"
              placeholder="이메일"
              v-model="email"/>
            <button @click="certificate()">인증</button>
            <input type="text" placeholder="token" v-model="token"><button @click="confirmToken()">확인</button>
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
  created() {
  },
  mounted() {
  },
  data() {
    return {
      realName: '',
      nickName: '',
      password: '',
      confirmPassword: '',
      email: '',
      token: '',
    };
  },
  methods: {
    joinUser() {
      console.log(this.errors.any());
    },
    certificate() {
      this.$http.post('/api/cert/mail', {
        email: this.email,
      })
        .then(results => console.log(results))
        .catch(err => console.error(err));
    },
    confirmToken() {
      this.$http.get(`/api/cert/compare/${this.email}/${this.token}`, {
        params: {
          email: this.email,
          token: this.token,
        },
      })
        .then(results => console.log(results))
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
    height: 90%;
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
        height: 60px;
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

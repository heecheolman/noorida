<template>
  <div class="page flex-container flex-center-sort">
    <div class="join-box">
      <h1 class="title text-center">회원가입</h1>
        <div class="input-box flex-container flex-center-sort flex-column">
          <div class="input-item-wrap flex-container flex-center-sort flex-column">
            <label
              :class="isTypedLabel"
              class="label--base">{{ realNamePlaceholder }}</label>
            <a-input
              type="text"
              name="realName"
              v-model="realName"
              v-validate.initial="{
                required: true,
                regex: /^[가-힝]{2,}$/,
              }"
            />
          </div>
          <div class="input-item-wrap flex-container flex-center-sort flex-column">
            <a-input
                type="text"
                placeholder="닉네임"
                name="nickName"
                v-model="nickName"
                v-validate.initial="{
                  required: true,
                  regex: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,21}$/
                }"
              />
          </div>
          <div class="input-item-wrap flex-container flex-center-sort flex-column">
            <a-input
                type="password"
                placeholder="비밀번호"
                ref="password"
                name="password"
                v-model="password"
                v-validate.initial="{
                  required: true,
                  regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/
                }"
              />
          </div>
          <div class="input-item-wrap flex-container flex-center-sort flex-column">
            <a-input
                type="password"
                placeholder="비밀번호 확인"
                data-vv-as="password"
                name="confirmPassword"
                v-model="confirmPassword"
                v-validate.initial="'required|confirmed:password'"
              />
          </div>
          <div class="input-item-wrap flex-container flex-between-sort flex-row" style="width: 100%;">
            <div style="width: 100%;">
              <a-input
                placeholder="이메일"
                name="email"
                v-model="email"
                v-validate.initial="{
                  required: true,
                  regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                }"
              />
            </div>
            <div class="button-wrap">
              <a-button type="default" style="font-size: 10px;"
                        @click="certificate()">인증</a-button>
            </div>
          </div>
          <div class="input-item-wrap flex-container flex-between-sort flex-row" style="width: 100%;">
            <div style="width: 100%;">
              <a-input
                type="text"
                placeholder="보안코드입력"
                name="certified"
                v-model="token"
                v-validate.initial="{ required: true }"
              />
            </div>
            <div class="button-wrap">
              <a-button type="default" style="font-size: 10px;"
                        @click="confirmToken()">확인</a-button>
            </div>
          </div>
        </div>
      <div class="navigation-box flex-container flex-column flex-between-sort">
        <a-button type="primary" block @click="joinUser()">회원가입</a-button>
        <a-button type="dashed" block>뒤로</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinPage',
  computed: {
    isTypedLabel() {
      return {
        'typed-label': this.realName.length !== 0,
        'valid': this.realNamePlaceholder === '사용 가능합니다!' ||
          this.realNamePlaceholder === '유효한 형식입니다!' ||
          this.realNamePlaceholder === '유효한 형식입니다!',
        'not-valid': this.realNamePlaceholder === '이미 있어요!' ||
          this.realNamePlaceholder === '형식이 틀립니다!' ||
          this.realNamePlaceholder === '제대로 입력해주세요!' ||
          this.realNamePlaceholder === '형식이 틀립니다!',
      };
    },
  },
  data() {
    return {
      realNamePlaceholder: '이름',
      realName: '',
      nickName: '',
      password: '',
      confirmPassword: '',
      email: '',
      token: '',
      certified: false,
      confirmDirty: false,
    };
  },
  methods: {
    joinUser() {
      if (!this.errors.any()) {
        this.$http.post('/api/join', {
          realName: this.realName,
          nickName: this.nickName,
          password: this.password,
          email: this.email,
        })
          .catch(err => console.error(err));
      } else {
        console.log('회원가입 실패임!');
      }
    },
    certificate() {
      this.$http.post('/api/cert/mail', {
        email: this.email,
      })
        .catch(err => console.error(err));
    },
    async confirmToken() {
      console.log(this.password);
      console.log(this.confirmPassword);
      this.certified = await this.$http.get(`/api/cert/user/${this.email}/${this.token}`, {
        params: {
          email: this.email,
          token: this.token,
        },
      })
        .then(result => result.data)
        .catch(err => err);
      console.log(this.certified);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';
  @import './../assets/scss/variables/colors';

  .label--base {
    color: #999;
    height: 50px;
    line-height: 60px;
    white-space: nowrap;
    font-size:  12px;
    left: 75px;
    z-index: 99;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    user-select: none;
    pointer-events: none;
    transition: transform ease-out .1s, -webkit-transform ease-out .1s;
  }

  .typed-label {
    transform: scale(.7333) translateX(-20%) translateY(-15px);
  }
  .valid { color: #1DA1F2 !important; }
  .not-valid { color: #ff2128 !important; }
  .error { color: #ff2128 !important; }

  input {
    padding-top: 14px;
    position: relative;
    font-size: 10px;
    height: 40px;
  }

  .join-box {
    width: 100%;
    max-width: 400px;
    height: 100%;
    padding: 20px;

    .title {
      @include font-size-x-large();
      color: $primary;
      margin-bottom: 10px;
    }

    .input-box {
      margin: 0 auto;
      max-width: 70%;
      min-height: 60%;
      width: 70%;
      height: auto;

      .input-item-wrap {
        width: 100%;
        height: 50px;

        .button-wrap {
          margin-left: 10px;
        }
      }
    }

    .navigation-box {
      margin: 15px auto;
      width: 196px;
      height: 80px;
    }

  }
</style>

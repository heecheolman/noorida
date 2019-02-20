<template>
  <div class="page flex-container flex-center-sort">
    <a-spin :spinning="loginLoading">
      <div class="login-box">
        <h1 class="title text-center">누리다</h1>
        <div class="input-box flex-container flex-center-sort flex-column">

          <a-form :form="form"
                  @submit="handleSubmit">
            <a-form-item>
              <a-input placeholder='닉네임'
                       v-decorator="['nickName', validateConfig.nickName]">
                <a-icon slot="prefix"
                        type='user'
                        style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-input v-decorator="['password', validateConfig.password]"
                       type="password"
                       placeholder="패스워드">
                <a-icon slot="prefix"
                        type="lock"
                        style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>

            <a-form-item>
              <div class="flex-container flex-center-sort">
                <a-checkbox v-decorator="['remember',
                            { valuePropName: 'checked', initialValue: true, }]">로그인 유지</a-checkbox>
              </div>
              <div class="flex-container flex-column flex-center-sort">
                <a-button type="primary"
                          htmlType="submit"
                          class="login-button">로그인</a-button>
                <router-link :to="{ name: 'JoinPage' }"
                             replace>회원가입</router-link>
              </div>
            </a-form-item>
          </a-form>

          <div class="find-info-box text-center">
            <router-link tag="span" class="find-info" :to="{ name: 'FindIdPage' }">
              아이디찾기</router-link>
            <router-link tag="span" class="find-info" :to="{ name:'FindPasswordPage' }">
              비밀번호찾기</router-link>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
export default {
  name: 'LoginPage',
  beforeCreate() {
    this.$store.dispatch('login/initLoginData');
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      keepLogin: false,
      validateConfig: {
        nickName: {
          rules: [{
            required: true,
            message: '닉네임을 입력해주세요',
          }],
        },
        password: {
          rules: [{
            required: true,
            message: '패스워드를 입력해주세요',
          }],
        },
      },
      loginLoading: false,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.loginLoading = true;
          await this.$store.dispatch('login/loginProcess', {
            nickName: values.nickName,
            password: values.password,
          });
          this.loginLoading = false;
          if (this.$store.getters['login/getLoginSuccess']) {
            this.$router.replace({ name: 'MainPage' });
          } else {
            this.$message.warning('아이디 또는 비밀번호가 일치하지 않습니다');
          }
        }
      });
    },
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

      .login-button {
        width: 100%;
        margin-top: 10px;
      }
    }

    .find-info-box {
      width: 100%;
      height: 50px;
      line-height: 50px;

      .find-info {
        @include font-size-xx-small;
        color: rgb(75, 75, 75);
        margin: 0 5px;
      }
    }
  }
</style>

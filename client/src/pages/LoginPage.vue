<template>
  <div class="page flex-container flex-center-sort">
    <div class="login-box">
      <h1 class="title text-center">누리다</h1>
      <div class="input-box flex-container flex-center-sort flex-column">
        <a-form
          :form="form"
          @submit="handleSubmit">
          <a-form-item>
            <a-input
              placeholder='닉네임'
              v-decorator="['nickName', { rules: [{ required: true, message: '닉네임을 입력해주세요' }] }]">
              <a-icon slot="prefix" type='user' style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="['password', { rules: [{ required: true, message: '비밀번호를 입력해주세요' }] }]"
              type="password"
              placeholder="패스워드">
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <div class="flex-container flex-center-sort">
              <a-checkbox
                v-decorator="['remember', { valuePropName: 'checked', initialValue: true, }]">
                로그인 유지
              </a-checkbox>
            </div>
            <div class="flex-container flex-column flex-center-sort">
              <a-button type="primary" htmlType="submit" class="login-button">로그인</a-button>
              <router-link :to="{ name: 'JoinPage' }">회원가입</router-link>
            </div>
          </a-form-item>
        </a-form>
        <div class="find-info-box text-center">
          <span class="find-info">아이디찾기</span>
          <span class="find-info">비밀번호찾기</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      keepLogin: false,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          // const user = await this.$http.post('/api/login', {
          //   nickName: values.nickName,
          //   password: values.password,
          // })
          //   .then(result => result.data)
          //   .catch(err => console.error(err));
          //
          // if (user) {
          //   console.log(user);
          // } else {
          //   console.log(user);
          // }
          this.$store.dispatch('login/loginProcess', {
            nickName: values.nickName,
            password: values.password,
          });
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

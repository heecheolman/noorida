<template>
  <div class="page flex-container flex-center-sort">
    <div class="join-box">
      <h1 class="title text-center">회원가입</h1>
        <div class="input-box flex-container flex-center-sort flex-column">
          <div class="input-item-wrap flex-container flex-center-sort flex-column">
            <a-form
              :form="form"
              @submit="handleSubmit"
            >
              <a-form-item
                hasFeedback
              >
                <a-input
                  placeholder="이름"
                  v-decorator="[
                    'realName',
                    {
                      rules: [{
                          required: true,
                          message: '이름을 입력해주세요',
                        }, {
                          pattern: /^[가-힝]{2,}$/,
                          message: '유효하지 않은 이름이에요',
                      }]
                    }
                 ]" />
              </a-form-item>
              <a-form-item
                hasFeedback
                validateStatus="validating"
              >
                <a-input
                  placeholder="닉네임"
                  v-decorator="[
                    'nickName',
                    {
                      rules: [{
                          required: true,
                          message: '닉네임을 입력해주세요',
                        }, {
                          pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,21}$/,
                          message: '유효하지 않은 닉네임이에요',
                      }]
                    }
                  ]"/>
              </a-form-item>
              <a-form-item
                hasFeedback
              >
                <a-input
                  placeholder="비밀번호"
                  v-decorator="[
                    'password',
                    {
                      rules: [{
                        required: true,
                        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/,
                        message: '비밀번호를 입력하세요',
                      }, {
                        validator: validateToNextPassword,
                        message: '비밀번호가 일치하지 않아요',
                      }]
                    }
                  ]"
                  type="password"
                />
              </a-form-item>
              <a-form-item
                hasFeedback
              >
                <a-input
                  placeholder="비밀번호 확인"
                  v-decorator="[
                    'confirm',
                    {
                      rules: [{
                        required: true,
                        message: '비밀번호확인을 입력하세요',
                      }, {
                        validator: compareToFirstPassword,
                        message: '비밀번호가 일치하지 않아요',
                      }]
                    }
                  ]"
                  type="password"
                  @blur="handleConfirmBlur"
                />
              </a-form-item>
              <div class="flex-container flex-between-sort flex-row">
                <a-form-item
                  hasFeedback
                >
                  <a-input
                    placeholder="이메일입력"
                    v-decorator="[
                      'email',
                      {
                        rules: [{
                            required: true,
                            message: '이메일을 입력해주세요!',
                          }, {
                            type: 'email',
                            message: '이메일형식이 아니에요',
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          }]
                      }
                    ]"
                  />
                </a-form-item>
                <div class="button-wrap">
                  <a-button type="default" style="font-size: 10px;"
                            @click="certificate()">인증</a-button>
                </div>
              </div>
              <div class="flex-container flex-between-sort flex-row" style="margin-bottom: 20px;">
                <div>
                  <a-input
                    v-model="token"
                    placeholder="보안코드입력"
                    type="text"
                  />
                </div>
                <div>
                  <a-button type="default" style="font-size: 10px;"
                            @click="confirmToken()">확인</a-button>
                </div>
              </div>
              <a-form-item>
                <a-button type="primary" htmlType="submit" block>회원가입</a-button>
              </a-form-item>
            </a-form>
            <a-button type="dashed" block style="width: 200px;">뒤로</a-button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinPage',
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
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
      this.certified = await this.$http.get(`/api/cert/user/${this.email}/${this.token}`, {
        params: {
          email: this.email,
          token: this.token,
        },
      })
        .then(result => result.data)
        .catch(err => err);
    },
    handleSubmit(e) {
      e.preventDefault();
      console.log(this.form.getFieldsError());
    },

    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true }, err => err);
      }
      callback();
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('비밀번호가 다릅니다.');
      } else {
        callback();
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';
  @import './../assets/scss/variables/colors';

  form {
    width: 80%;
  }
  input, input::placeholder {
    font-size: 10px;
  }

  .join-box {
    width: 100%;
    height: 100%;
    padding: 20px;

    .title {
      @include font-size-x-large();
      color: $primary;
      margin-bottom: 10px;
    }

    .input-box {
      margin: 0 auto;
      max-width: 90%;
      min-height: 70%;
      width: 100%;
      height: auto;

      .input-item-wrap {
        width: 250px;

        .button-wrap {
          padding-top: 5px;
          display: flex;
          height: 63px;
        }
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
</style>

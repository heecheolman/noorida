<template>
  <div class="page flex-container flex-center-sort">
    <a-spin size="large" :spinning="joinLoading">
    <div class="join-box">
      <h1 class="title text-center">회원가입</h1>
      <div class="input-box flex-container flex-center-sort flex-column">
        <div class="input-item-wrap flex-container flex-center-sort flex-column">

          <a-form
            :form="form"
            @submit="joinUser">

            <a-form-item
              hasFeedback>
              <a-input
                placeholder="이름"
                v-decorator="['realName', validateConfig.realName]" />
            </a-form-item>

            <a-form-item
              hasFeedback
              :validate-status="nickNameStatus">
              <a-input
                placeholder="닉네임"
                v-decorator="['nickName', validateConfig.nickName]"
                @input="nickNameChecker"
                @change="nickNameStatus='validating'" />
            </a-form-item>

            <a-form-item
              hasFeedback>
              <a-input
                placeholder="비밀번호"
                v-decorator="['password', validateConfig.password]"
                type="password"
              />
            </a-form-item>

            <a-form-item
              hasFeedback>
              <a-input
                placeholder="비밀번호 확인"
                v-decorator="['confirm', validateConfig.confirmPassword]"
                type="password" />
            </a-form-item>

            <div class="flex-container flex-between-sort flex-row">

              <a-form-item
                hasFeedback
                :validate-status="emailStatus">
                <a-input
                  placeholder="이메일입력"
                  style="max-width: 130px;"
                  v-decorator="['email', validateConfig.email]"
                  @input="emailChecker"
                  @change="emailStatus='validating'" />
              </a-form-item>

              <div class="button-wrap">
                <a-button
                  @click="certificate()"
                  style="font-size: 10px;"
                  :loading="emailLoading"
                  :disabled="emailStatus !== 'success'">인증</a-button>
              </div>

            </div>

            <div class="flex-container flex-between-sort flex-row" style="margin-bottom: 20px;">
              <div>
                <a-input
                  v-model="token"
                  style="max-width: 130px;"
                  placeholder="보안코드입력"
                  type="text" />
              </div>
              <div>
                <a-button v-if="!certified"
                          type="default" style="font-size: 10px;"
                          :disabled="!!form.getFieldError('email') || token.length < 6"
                          :loading="tokenLoading"
                          @click="confirmToken()">확인</a-button>

                <a-icon v-else-if="certified"
                        type="check-circle"
                        theme="filled"
                        style="color: #52c41a" />
              </div>
            </div>

            <a-form-item>
              <a-button type="primary" htmlType="submit" block>회원가입</a-button>
            </a-form-item>
          </a-form>

          <a-button
            block
            type="dashed"
            style="width: 200px;"
            @click="routeLoginPage()">뒤로</a-button>
        </div>
      </div>
    </div>
    </a-spin>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'JoinPage',
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      joinLoading: false,
      emailLoading: false,
      tokenLoading: false,
      nickNameStatus: '',
      emailStatus: '',
      token: '',
      certified: false,
      /**
       * 유효성 검사 규칙들
       */
      validateConfig: {
        realName: {
          rules: [{
            required: true,
            message: '이름을 입력해주세요',
          }, {
            pattern: /^[가-힝]{2,}$/,
            message: '유효하지 않은 이름이에요',
          }],
        },
        nickName: {
          rules: [{
            required: true,
            message: '닉네임을 입력해주세요',
          }, {
            pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,21}$/,
            message: '영문 대소문자, 특수기호(마침표,언더바) 포함 22글자 이하',
          }],
        },
        password: {
          rules: [{
            required: true,
            pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/,
            message: '영문 대소문자, 특수기호 최소  각 1개씩 포함 10글자 이상',
          }, {
            validator: this.validateToNextPassword,
            message: '비밀번호가 일치하지 않아요',
          }],
        },
        confirmPassword: {
          rules: [{
            required: true,
            message: '비밀번호확인을 입력하세요',
          }, {
            validator: this.compareToFirstPassword,
            message: '비밀번호가 일치하지 않아요',
          }],
        },
        email: {
          rules: [{
            required: true,
            message: '이메일을 입력해주세요!',
          }, {
            type: 'email',
            message: '이메일형식이 아니에요',
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          }],
        },
      },
    };
  },
  methods: {
    certificate() {
      this.emailLoading = true;
      const email = this.form.getFieldValue('email');
      this.$api.sendCertMail(email)
        .then(() => {
          this.$message.success('인증 코드가 전송되었습니다.');
        })
        .catch(() => {
          this.$message.error('서버 오류입니다. 다시 시도해주세요.');
        })
        .finally(() => {
          this.emailLoading = false;
        });
    },

    async confirmToken() {
      this.tokenLoading = true;
      const email = this.form.getFieldValue('email');
      this.certified = await this.$api.confirmToken(email, this.token)
        .then(result => result.data)
        .catch(() => {
          this.$message.error('서버 오류입니다. 다시 시도해주세요.');
        })
        .finally(() => {
          this.tokenLoading = false;
        });

      if (this.certified) {
        this.$message.success('인증 완료');
      } else {
        this.$message.warning('보안코드가 다릅니다');
      }
    },

    joinUser(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (error, values) => {
        if (!error && this.certified) {
          this.joinLoading = true;
          const vm = this;
          const { realName, nickName, password, email } = values;
          await this.$api.join(realName, nickName, password, email)
            .then(() => {
              this.$success({
                title: '회원가입 완료! 🎉',
                content: '가입이 완료되었습니다.',
                okText: '확인',
                centered: true,
                onOk() {
                  vm.$router.replace({ name: 'LoginPage' });
                },
              });
            })
            .catch(() => {
              this.$message.error('예상하지 못한 에러가 발생했습니다. 다시 시도해주세요');
            })
            .finally(() => {
              this.joinLoading = false;
            });
        } else {
          this.$message.warning('회원가입 양식을 다시 확인해보세요');
        }
      });
    },

    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value) {
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

    nickNameChecker: _.debounce(
      function () {
        const nickName = this.form.getFieldValue('nickName');
        const pattern = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,21}$/;

        if (!!nickName && pattern.test(nickName)) {
          this.$api.validateNickName(nickName)
            .then((result) => {
              if (!result.data) {
                this.nickNameStatus = 'success';
                this.$message.success('사용하실 수 있습니다');
              } else {
                this.nickNameStatus = 'warning';
                this.$message.warning('이미 사용하고 있어요!');
              }
            });
        } else {
          this.nickNameStatus = 'error';
        }
      }, 500,
    ),

    emailChecker: _.debounce(
      function () {
        const email = this.form.getFieldValue('email');
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!!email && pattern.test(email)) {
          this.$api.validateEmail(email)
            .then((result) => {
              if (!result.data) {
                this.emailStatus = 'success';
                this.$message.success('사용할 수 있는 이메일입니다');
              } else {
                this.emailStatus = 'warning';
                this.$message.warning('이미 사용하고 있어요');
              }
            });
        } else {
          this.emailStatus = 'error';
        }
      }, 500,
    ),

    routeLoginPage() {
      this.$router.replace({ name: 'LoginPage' });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';
  @import './../assets/scss/theme/colors';

  input {
    @include font-size-small;
  }

  form {
    width: 80%;
  }

  .join-box {
    width: 100%;
    height: 100%;
    padding: 20px;
    font-size: 2000px;

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

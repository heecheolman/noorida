<template>
  <div class="page flex-container flex-center-sort">
    <div class="join-box">
      <h1 class="title text-center">회원가입</h1>
      <div class="input-box flex-container flex-center-sort flex-column">
        <div class="input-item-wrap flex-container flex-center-sort flex-column">
          <a-form
            :form="form"
            @submit="joinUser()"
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
                  style="max-width: 130px;"
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
                <a-popover
                  v-if="!form.getFieldError('email') && !!form.isFieldTouched('email')"
                  trigger="click"
                  placement="topLeft"
                  v-model="emailPopVisible"
                >
                  <div slot="content">
                    <div style="text-align: right;">
                      인증코드가 전송되었습니다.
                      <a style="margin-left: 15px;" @click="emailPopVisible = false">닫기</a>
                    </div>
                  </div>
                  <a-button
                    :disabled="!!form.getFieldError('email') || !form.isFieldTouched('email')"
                    style="font-size: 10px;"
                    @click="certificate()"
                    type="default">인증
                  </a-button>
                </a-popover>
                <a-button
                  v-else
                  disabled
                  style="font-size: 10px;">인증</a-button>
              </div>
            </div>
            <div class="flex-container flex-between-sort flex-row" style="margin-bottom: 20px;">
              <div>
                <a-input
                  v-model="token"
                  style="max-width: 130px;"
                  placeholder="보안코드입력"
                  type="text"
                />
              </div>
              <div>
                <a-button v-if="!certified"
                          type="default" style="font-size: 10px;"
                          :disabled="!!form.getFieldError('email') || token.length !== 36"
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
          <a-button type="dashed" block style="width: 200px;">뒤로</a-button>
        </div>
      </div>
    </div>
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
      token: '',
      certified: false,
      confirmDirty: false,
      emailValidate: false,
      emailPopVisible: false,
      tokenLoading: false,
    };
  },
  methods: {
    certificate() {
      const email = this.form.getFieldValue('email');

      this.$http.post('/api/cert/mail', {
        email,
      })
        .catch(err => console.error(err));
    },
    async confirmToken() {
      this.tokenLoading = true;
      const email = this.form.getFieldValue('email');
      this.certified = await this.$http.get(`/api/cert/user/${email}/${this.token}`, {
        params: {
          email,
          token: this.token,
        },
      })
        .then(result => result.data)
        .catch(err => err)
        .finally(() => {
          this.tokenLoading = false;
        });
    },
    joinUser(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err && !this.certified) { // 인증도 성공하고 폼도 맞다면 회원가입 진행
          console.log('Recieved values of form: ', values);
          /**
           * api 인터페이스 작성
           */
        } else {
          // 에러 존재시
          console.log('err', err);
          console.log('ciertified', this.certified);
        }
      });
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

    .info {
      font-size: 10px !important;
      color: #314659 !important;
      margin-right: 5px !important;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>


<template>
  <div class="page flex-container flex-center-sort">
    <div class="find-box">
      <div class="title-head text-center flex-container flex-center-sort">
        <h1 class="title-color">아이디 찾기</h1>
      </div>
      <div>
        <a-form
          :form="form"
          @submit="FindId">
          <div class="components-input-demo-size flex-container flex-center-sort">
            <a-form-item>
              <a-input
                v-decorator="[ 'realName', validateConfig.realName ]"
                placeholder="이름"
              />
            </a-form-item>
          </div>
          <div class="components-input-demo-size flex-container flex-center-sort ">
            <a-form-item>
              <a-input
                v-decorator="[ 'email',validateConfig.email ]"
                placeholder="이메일"
              />
            </a-form-item>
          </div>
          <div class="flex-container flex-center-sort margin--top-10">
            <a-button class="button-size" color="primary" type="primary"
                      htmlType="submit">아이디 찾기
            </a-button>
          </div>
          <div class="flex-container flex-center-sort margin--10">
            <a-button class="button-size" type="dashed" @click="goToBack()">뒤로가기</a-button>
          </div>
        </a-form>
      </div>
      <div class="link-move flex-container flex-center-sort margin--bottom-10">
        <router-link tag="span" class="find-link-design" :to="{ name:'FindPasswordPage' }">
          비밀번호 찾기
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FindIdPage',
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    data() {
      return {
        validateConfig: {
          realName: {
            rules: [{
              required: true, message: '이름을 입력해주세요.',
            }],
          },
          email: {
            rules: [{
              type: 'email', message: '이메일형식이 아니에요.',
            }, {
              required: true, message: '이메일을 입력해주세요.',
            }],
          },
        },
      };
    },
    methods: {
      goToBack() {
        this.$router.push({ name: 'LoginPage' });
      },
      FindId(e) {
        e.preventDefault();
        this.form.validateFields(async (err, values) => {
          if (!err) {
            await this.$store.dispatch('find/findIdProcess', {
              realName: values.realName,
              email: values.email,
            });
            if (this.$store.getters['find/getFindNickname']) {
              this.$router.replace({ name: 'ShowFoundIdPage' });
            } else {
              this.$message.warning('일치하는 회원정보가 없습니다.');
            }
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';

  .find-box {
    width: 100%;
    height: 80%;
    padding: 20px;
  }

  .find-link-design {
    font-size: 13px;
    margin: 10px;
    text-align: center;
  }

  .title-color {
    color: #1f74ff;
    font-size: 30px;
  }

  .components-input-demo-size .ant-input {
    width: 200px;
    margin: 8px;
  }

  .title-head {
    height: 100px;
    background: white;
  }

  .margin--10 {
    margin: 10px;
  }

  .margin--top-10 {
    margin-top: 10px;
  }

  .margin--top-30 {
    margin-top: 30px;
  }

  .button-size {
    width: 200px;
    height: 32px;
  }

</style>

<template>
  <div class= "page flex-container flex-center-sort">
    <div class ="find-box">
      <div class="title-head text-center flex-container flex-center-sort">
        <h1 class="title-color">비밀번호 찾기</h1>
      </div>
      <div>
        <a-form
          :form="form"
          @submit="FindPassword">
          <div class="components-input-demo-size flex-container flex-center-sort">
            <a-form-item>
              <a-input
                v-decorator="['realName', validateConfig.realName ]"
                placeholder="이름"
                v-model="realName"
              />
            </a-form-item>
          </div>
          <div class="components-input-demo-size flex-container flex-center-sort ">
            <a-form-item>
              <a-input
                v-decorator="[ 'nickName', validateConfig.nickName ]"
                placeholder="닉네임"
                v-model="nickName"
              />
            </a-form-item>
          </div>
          <div class="components-input-demo-size flex-container flex-center-sort ">
            <a-form-item>
              <a-input
                v-decorator="[ 'email', validateConfig.email ]"
                placeholder="이메일"
                v-model="email"
              />
            </a-form-item>
          </div>
          <div class="flex-container flex-center-sort margin--top-10">
            <a-button class="button-size" color="primary"
                      type="primary" htmlType="submit">비밀번호 찾기</a-button>
            <router-link :to="{name :'LoginPage'}"></router-link>
          </div>
          <div class="flex-container flex-center-sort margin--10">
            <a-button class="button-size" type="dashed" @click="goToBack()">뒤로가기</a-button>
          </div>
        </a-form>
      </div>
      <div class="flex-container flex-center-sort">
        <router-link tag="span"
                     class="find-link-design"
                     :to="{ name: 'FindIdPage' }">
          아이디 찾기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FindPasswordPage',
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      realName: '',
      nickName: '',
      email: '',
      validateConfig: {
        realName: {
          rules: [{
            required: true, message: '이름을 입력해주세요.',
          }],
        },
        nickName: {
          rules: [{
            required: true, message: '닉네임을 입력해주세요.',
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
    FindPassword(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          await this.$store.dispatch('find/findPasswordProcess', {
            realName: values.realName,
            nickName: values.nickName,
            email: values.email,
          });
          if (this.$store.getters['find/getFindPasswordSuccess']) {
            this.$success({
              title: '비밀번호 찾기',
              content: `${this.email} (으)로 임시 비밀번호를 발송하였습니다.`,
              okText: '로그인',
              centered: true,
            });
            this.$router.replace({ name: 'LoginPage' });
          } else {
            this.$message.warning('회원정보가 존재하지 않습니다.');
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .find-box{
    width: 100%;
    height: 80%;
    padding: 20px;
  }
  .find-link-design{
    font-size: 12px;
    margin: 10px;
    text-align: center;
  }
  .components-input-demo-size .ant-input {
    width: 200px;
    margin: 8px;
  }

  .title-head{
    height: 100px;
    background: white ;
  }
  .title-color{
    color: #1f74ff;
    font-size: 30px;
  }
  .margin--10{
    margin: 10px;
  }
  .margin--top-10{
    margin-top: 10px;
  }
  .margin--top-30{
    margin-top: 30px;
  }
  .button-size{
    width: 200px;
    height: 32px;
  }
</style>

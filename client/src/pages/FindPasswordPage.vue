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
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [{
                    required: true, message: 'Please input your Name',
                  }]
                }
              ]"
              placeholder="이름"
              v-model="name"
            />
          </div>
          <div class="components-input-demo-size flex-container flex-center-sort ">
            <a-input
              v-decorator="[
                'id',
                {
                  rules: [{
                    required: true, message: 'Please input your NickName!',
                  }]
                }
              ]"
              placeholder="NICKNAME"
              v-model="nickName"
            />
          </div>
          <div class="components-input-demo-size flex-container flex-center-sort ">
            <a-input
              v-decorator="[
                'email',
                 {
                   rules: [{
                     type: 'email', message: 'The input is not valid E-mail!',
                     }, {
                     required: true, message: 'Please input your E-mail!',
                   }]
                 }
              ]"
              placeholder="이메일"
              v-model="email"
            />
          </div>
        </a-form>
      </div>
      <div class="flex-container flex-center-sort margin--top-30">
        <a-button class="button-size" color="primary"
                  type="primary" htmlType="submit">비밀번호 찾기</a-button>
        <router-link :to="{name :'LoginPage'}"></router-link>
      </div>
      <div class="flex-container flex-center-sort margin--10">
        <a-button class="button-size" type="dashed" @click="goToBack()">뒤로가기</a-button>
      </div>
      <div class="flex-container flex-center-sort">
        <router-link tag="span"
                     class="find-link-design"
                     :to="{ name: 'LoginPage' }">로그인</router-link>
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
  data() {
    return {
      name: '',
      id: '',
      email: '',
      password: '',
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    goToBack() {
      this.$router.push({name: 'LoginPage'});
    },
    FindPassword(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          await this.$store.dispatch('find/findPasswordProcess', {
            name: values.name,
            nickName: values.nickName,
            email: values.email,
          });
        }
        if (this.$store.getters['find/getFindSuccess']) {
          //this.password = state.newPassword; //아니지 이
          //api.findpassword.password = state.newPassword; //??

          this.$router.push({name: 'LoginPage'});
        } else {
          this.$message.warning('회원정보가 존재하지 않습니다. ');
        }
      });
    },
  },
};

</script>

<style lang="scss" scoped>
  .find-box{
    width: 100%;
    height: 90%;
    padding: 20px;
  }
  .find-link-design{
    font-size: 12px;
    text-decoration: underline blue;
    margin: 10px;
    color: blue;
    align-text: right;
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
  .margin--top-30{
    margin-top: 30px;
  }
  .margin--top-30{
    margin-top: 30px;
  }
  .button-size{
    width: 200px;
    height: 32px;
  }
</style>

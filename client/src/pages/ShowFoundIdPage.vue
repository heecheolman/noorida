<template>
  <div class="page flex-container flex-center-sort">
    <div class="find-box">
      <div class="title-head text-center flex-container flex-center-sort">
        <h1 class="title-color">아이디 찾기</h1>
      </div>
      <div class="components-input-demo-size text-center flex-center-sort box-design ">
        <div>
          <p> <strong>{{realName}}</strong> 님의 닉네임은 <br> <strong>{{nickName}}</strong> 입니다.</p>
        </div>
      </div>
      <div class="flex-container flex-center-sort margin--top-10">
        <a-button class="button-size" color="primary" type="primary"
                  @click="Login()">로그인
        </a-button>
      </div>
      <div class="flex-container flex-center-sort margin--10">
        <router-link tag="span" class="find-link-design" :to="{ name:'FindPasswordPage' }">
          비밀번호 찾기
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'ShowFoundIdPage',
    async created() {
      this.nickName = this.$store.getters['find/getFindNickname'];
      this.realName = this.$store.getters['find/getRealName'];
    },
    data() {
      return {
        realName : '',
        nickName : '',
        message : '',
      };
    },
    methods : {
      Login() {
        this.$router.push({ name: 'LoginPage' });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';

  .find-box{
    width: 100%;
    height: 80%;
    padding: 20px;
  }
  .find-link-design{
    font-size: 13px;
    margin: 10px;
    text-align: center;
  }
  .title-color{
    color:#1f74ff;
    font-size: 30px;
  }
  .title-head{
    height: 100px;
    background: white;
  }
  .margin--10{
    margin: 10px;
  }
  .margin--top-10{
    margin-top: 10px;
  }
  .button-size{
    width: 200px;
    height: 32px;
  }
  .box-design{
    height: 130px;
    font-size: 18px;
    line-height: 2.5;
  }
</style>

<template>
  <div class="page flex-container flex-center-sort">
    <div class="find-box">
      <div class="head-title text-center flex-container flex-center-sort">
        <h1 class="title-color">아이디 찾기</h1>
      </div>
      <div>
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
      </div>
      <div class="flex-container flex-center-sort margin--top-30">
        <a-button class="button-size" color="primary" type="primary" @click="FindId()">아이디 찾기</a-button>
      </div>
      <div class="flex-container flex-center-sort margin--10">
        <a-button class="button-size" type="dashed" @click="goToBack()">뒤로가기</a-button>
      </div>

      <div class="link-move flex-container flex-center-sort margin--bottom-10">
        <router-link :tag="span" class="id-password-link" :to="{name: 'LoginPage'}">로그인</router-link>
        <br>
        <router-link :tag="span" class= "id-password-link" :to="{name:'FindPasswordPage'}">
          비밀번호 찾기</router-link>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'FindIdPage',
    data() {
      return {
        name: '',
        email: '',
        id: '',

      };
    },
    methods : {
      goToBack() {
        window.history.go(-1);
      },
      FindId() {
        /*아이디 찾기 버튼 클릭시!! */
        var check =confirm(this.name+'님 의 ID는 '+this.id + '입니다. \n 비밀번호찾기 창으로 이동하시겠습니까?');
        if(check == true){
          location.href = '#/find-password' ;
        }else{
          location.href = '#/login' ;
        }

      },
    },
  };
</script>

<style>
  .find-box{
    width: 100%;
    height: 90%;
    padding: 20px;
  }
  .id-password-link{
    font-size: 12px;
    text-decoration: underline blue;
    margin: 10px;
    color: blue;
    align-text: right;
  }
  .title-color{
    color:#1f74ff;
    font-size: 30px;
  }
  .components-input-demo-size .ant-input {
    width: 200px;
    margin: 8px;
  }

  .head-title{
    height: 100px;
    background: white;
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

<template>
  <div>
    <toolbar :title="'계정 탈퇴'" />
    <div class="input-box flex-container flex-center-sort flex-column">
      <br/>  <br/>  <br/>

      <div >
        <div>
          <a-input v-model="confirmNickname"
                 placeholder='닉네임' >
          <!--v-decorator="['confirmNickName', this.nickName]"-->
                   <!--message="sdfsdfsdf" >-->
            <a-icon slot="prefix"
                    type='user'
                    style="color: rgba(0,0,0,.25)" />
          </a-input>
        </div>
              <br />
        <div>
          <a-input v-model="confirmPassWord"
                   type="password"
                   placeholder="기존 비밀번호">
            <a-icon slot="prefix"
                    type="lock"
                    style="color: rgba(0,0,0,.25)" />
          </a-input>
        </div>
        <br />
        <div>

          <div class="flex-container">
            <a-button type="primary"
                      class="common-button"
                      @click="goToBack()">뒤로</a-button>
            <a-button type="primary"
                      @click="boolName()"
                      class="common-button">탈 퇴</a-button>

          </div>
        </div>
      </div>
      <!--<div v-model = "decVisible">-->
        <!--계정 탈퇴 할꺼냐-->
        <!--<button @click="withdrawalProcess()">탈퇴하기 버튼~~</button>-->

      <!--</div>-->
      <!--<div v-model = "trueWithdrawal">-->
        <!--탈퇴함~~~-->
        <!--<button @click="goToLoginPage()">로그인창으로 이동</button>-->


      <!--</div>-->






      <a-modal v-model = "decVisible"
               title = "계정 탈퇴"
               okText="탈퇴"
               cancelText = "취소"
               @cancel="decVisible = false"
               @ok="withdrawalProcess()" >
        <div>
          <span>{{this.myNickName}} 님! <br/></span>
          <br />
          <p>탈퇴 버튼을 누르시면 사진, 댓글, 좋아요 및 구독관계등을 포함한
            모든 데이터가 영구적으로 삭제되어 복구할 수 없습니다.
          <br />
            정말 탈퇴 하시겠습니까?
          </p>
        </div>
      </a-modal>
      <a-modal v-model = "trueWithdrawal"
               title = "Noorida"
               onok="확인"
               @ok="goToLoginPage()" >
        <div>
         {{this.myNickName}} 님의 계정이 삭제되었습니다.
          그동안 Noorida를 이용해주셔서 감사합니다:)
        </div>
      </a-modal>
      <!--<div v-model="wrongInfo">-->
        <!--닉네임 또는 비밀번호를 잘못 입력하셨습니다.-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  const Toolbar = () => import('@/components/Toolbar');
  import { mapState } from 'vuex';

  export default {
    name: 'WithdrawalPage',
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    components: {
      Toolbar,
    },
    data() {
      return {
        confirmNickname: '',
        confirmPassWord: '',
        myNickName: this.$store.state.user.user.nickname,
        decVisible: false ,
        trueWithdrawal: false ,
        // wrongInfo: false,
        boolNickName: false,

      }
    },
    computed: {
      ...mapState('withdrawal', [
        'withdrawalSuccess',
      ]),
    },
    methods : {
      boolName() {
        if (this.myNickName === this.confirmNickname){
          this.decVisible = true;
        } else {
          this.decVisible = false;
          this.$message.warning('잘못된 닉네임 입니다.');
        }
      },
     async withdrawalProcess() {   //이걸 누르면 탈퇴처리가 됨!!!!!!!!!!!!!
       await this.$store.dispatch('withdrawal/withdrawalProcess', {
         userId: this.$store.state.user.user.userId,
         nickName: this.confirmNickname,
         password:  this.confirmPassWord,
       });
       console.log('false이어야함!!',this.withdrawalSuccess);
       if( this.withdrawalSuccess === true) {
         this.decVisible = false;
         this.trueWithdrawal = true;
       } else {
         this.$message.warning('비밀번호가 일치하지 않습니다.');
         this.decVisible = false;
       }
        //여기서 뷰엑스와 연결 --> 탈퇴를 해주고!!
        //다 되면 ok를 뷰페이지에다가 보내줌 이거 데이터에다가 withdrawlok: false, 해주고
        //여기다 true값을 주어서 탈퇴가 완료됨을 알려주고 이거야??? 그럼 탈퇴가 되셨네요~~~추카추카~~하먄 끝~~

      },


      realWithdrawal() {  // 탈퇴버튼을 클릭함 리얼 탈퇴페이지를 보여주기위해서이다~~~그냥 tru냐폴스냐만 !!
        this.decVisible = true;
      },
      // logTest() {
      //   console.log('트루나 폴스냐!!이걸 누르면 무조건 폴스여야함',this.decVisible);
      // },
      goToBack() {
        console.log('뒤로가기');
        // this.$router.push({ name: 'MainPage'});
      },
      goToLoginPage() {
        console.log('로그인 페이지로 이동함~~');
        // this.$router.push({ name: 'LoginPage' });
      },
      // confirmNickname() {
      //   if (this.conf === this.nickName) {
      //
      //   }else {
      //     this.$message.warning('잘못된 닉네임 입니다.');
      //   }
      // },


      // async withdrawal() {
      //   const nickName = this.confirmNickname;
      //   const password = this.confirmPassWord;
      //   await this.$api.login(nickName, password)
      //     .then(() => {
      //       this.$success({
      //         title: '계정 탈퇴',
      //         content: '진짜 탈퇴할꺼................??',
      //         okText: '탈퇴',
      //         cancelText: '취소',
      //         centered: true,
      //         onOk() {
      //           // api에게 탈퇴 ok 보내줄것!!!
      //           this.$success({
      //             title: '계정 탈퇴',
      //             content: nickName+'님의 계정이 삭제 되었습니다.' +
      //               '그동안 Noorida를 이용해주셔서 감사합니다.',
      //             okText: '',
      //             centered: true,
      //             onOk() {
      //               this.$router.replace({ name: 'LoginPage' });
      //             },
      //           })
      //         },
      //         onCancel() {
      //           this.$router.replace({ name: 'MainPage' });
      //         },
      //       });
      //     })
      //     .catch(() => {
      //       this.$message.warning('회원 정보가 일치하지 않습니다!');
      //     })
      //////////////////////////////////////////이 밑은 진짜 다 필요없을듯/////////////////////////////////////////////
      //     const vm = this;
      //       const nickName = this.confirmNickname;
      //       const password = this.confirmPassWord;
      //       await this.$api.sewfisd(nickName, password)
      //         .then(() => {
      //           this.$success({
      //             title: '',
      //             content: '',
      //             okText: '탈퇴',
      //             centered: true,
      //             onOk() {
      //               vm.$router.replace({ name: 'LoginPage' });
      //             },
      //           });
      //         })
      //         .catch(() => {
      //           this.$message.error('예상하지 못한 에러가 발생했습니다. 다시 시도해주세요');
      //         })
      //         .finally(() => {
      //
      //         });
      //     } else {
      //       this.$message.warning('회원가입 양식을 다시 확인해보세요');
      // }
      // },

    },
  }
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';
  @import './../assets/scss/theme/colors';
  .input-box {
    margin: 0 auto;
    max-width: 80%;
    min-height: 70%;
    width: 100%;
    height: auto;

    .common-button {
      display: flow;
      width: 50%;
      margin: 5px;
    }
   a-model .text-warning {
      color: red;
    }
  }
</style>

<template>
  <div>
    <toolbar :title="'계정 탈퇴'" />
    <div class="input-box flex-container flex-center-sort flex-column withdrawal-page-container">
      <div >
        <div>
          <a-input v-model="confirmNickname"
                 placeholder='닉네임' >
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
      <a-modal v-model = "decVisible"
               title = "계정 탈퇴"
               okText="탈퇴"
               cancelText = "취소"
               @cancel="decVisible = false"
               @ok="withdrawalProcess()" >
        <div>
          <span><strong>{{this.myNickName}} 님! </strong><br/></span>
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
         {{this.myNickName}} 님의 계정이 삭제되었습니다.<br />
          그동안 Noorida를 이용해주셔서 감사합니다:)
        </div>
      </a-modal>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
const Toolbar = () => import('@/components/Toolbar');

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
      decVisible: false,
      trueWithdrawal: false,
      boolNickName: false,
    };
  },
  computed: {
    ...mapState('withdrawal', [
      'withdrawalSuccess',
    ]),
  },
  methods: {
    boolName() {
      if (this.myNickName === this.confirmNickname){
        this.decVisible = true;
      } else {
        this.decVisible = false;
        this.$message.warning('잘못된 닉네임 입니다.');
      }
    },
    async withdrawalProcess() {
      await this.$store.dispatch('withdrawal/withdrawalProcess', {
        userId: this.$store.state.user.user.userId,
        nickName: this.confirmNickname,
        password: this.confirmPassWord,
      });
      if (this.withdrawalSuccess === true) {
        this.decVisible = false;
        this.trueWithdrawal = true;
      } else {
        this.$message.warning('비밀번호가 일치하지 않습니다.');
        this.decVisible = false;
      }
    },
    goToBack() {
      this.$router.replace({ name: 'LocalNewsTab' });
    },
    goToLoginPage() {
      this.$router.replace({ name: 'LoginPage' });
    },
  },
};

</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';
  @import './../assets/scss/theme/colors';
  .withdrawal-page-container{
    padding-top: 60px;
  }
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
  }
</style>

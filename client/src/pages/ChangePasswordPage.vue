<template>
  <div class="flex-container flex-center-sort">
    <toolbar :title="'비밀번호 변경'"/>
    <div class="change-box flex-center-sort">
      <a-form
        :form="form"
        @submit="ChangePassword">
        <div class="margin--70 flex-center-sort">
          <a-form-item>
            <a-input
              placeholder="기존 비밀번호 입력"
              v-decorator="['oldPassword', validateConfig.oldPassword]"
              type="password"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              placeholder="새 비밀번호 입력"
              v-decorator="['newPassword', validateConfig.newPassword]"
              type="password"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              placeholder="새 비밀번호 확인"
              v-decorator="['confirm', validateConfig.confirmPassword]"
              type="password"
            />
          </a-form-item>
          <a-form-item class=" text-center ">
            <a-button type="primary" htmlType="submit">비밀번호 변경</a-button>
          </a-form-item>
        </div>
      </a-form>
    </div>
  </div>

</template>


<script>

  const Toolbar = () => import('@/components/Toolbar');

  export default {
    name: 'ChangePasswordPage',
    components: {Toolbar},
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    async created() {
      this.userId = this.$store.state.user.user.userId;
    },
    data() {
      return {
        userId: '',
        validateConfig: {
          oldPassword: {
            rules: [{
              required: true,
              message: '비밀번호를 입력하세요.',
            }],
          },
          newPassword: {
            rules: [{
              required: true,
              pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/,
              message: '비밀번호를 입력하세요',
            }, {
              validator: this.validateToNextPassword,
              message: '비밀번호가 일치하지 않습니다',
            }],
          },
          confirmPassword: {
            rules: [{
              required: true,
              message: '비밀번호를 입력하세요.',
            },{
              validator: this.compareToFirstPassword,
              message: '비밀번호가 일치하지 않습니다.',
            }],
          },
        },
      }
    },
    methods: {
      validateToNextPassword(rule, value, callback) {
        const form = this.form;
        if (value) {
          form.validateFields(['confirm'], { force: true }, err => err);
        }
        callback();
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form;
        if (value && value !== form.getFieldValue('newPassword')) {
          callback('비밀번호가 다릅니다.');
        } else {
          callback();
        }
      },
      ChangePassword(e) {
        e.preventDefault();
        this.form.validateFields(async (err, values) => {
          if (!err) {
            await this.$store.dispatch('find/changePasswordProcess', {
              userId: this.userId,
              oldPassword: values.oldPassword,
              newPassword: values.newPassword,
            });
            if(this.$store.getters['find/getChangePasswordSuccess']) {
              this.$success({
                title: '비밀번호 변경',
                content: `비밀번호가 성공적으로 변경되었습니다!`,
                okText: '확인',
                centered: true,
              });
              this.$router.replace({name: 'MainPage'});
            }else{
              this.$message.warning('잘못된 정보입니다. 다시 입력해주세요');
            }
          }
        });
      },
    },
  }

</script>

<style scoped>

  .margin--70{
    margin: 70px;
  }

</style>

<template>
  <div class="profile-container">
    <toolbar :title="'프로필'"/>
    <div class="user-header-section flex-container flex-column">
      <div class="medal-wrap flex-container flex-center-sort">
        <i class="fas fa-medal medal"></i>
      </div>
      <div class="score-wrap text-center">
        <span class="score">475</span>
      </div>
      <div class="avatar-wrap flex-container flex-center-sort">
        <div class="profile-upload-wrapper">
          <div class="avatar-zone">
            <!--이미지가 존재하는 경우-->
            <img v-if="profilePath"
                 class="avatar"
                 :src="`http://localhost:3000/images/${profilePath}`"
                 alt="profile">
            <!--존재하지 않는 경우-->
            <div v-else class="default-profile"></div>
          </div>
          <label v-if="isMe" class="upload-text" for="upload">편집</label>
          <input v-if="isMe" id="upload" class="upload" type="file" accept="image/*" @change="uploadProcess">
        </div>
      </div>
      <div class="nickname-wrap text-center">
        <span class="nickname">{{ info.nickName }}</span>
      </div>
      <div class="subscript-button-wrap flex-container flex-center-sort" v-if="!isMe">
        <a-button v-show="!isSubscribe"
                  type="primary"
                  size="small"
                  @click="subscribeReporter">구독하기
        </a-button>
        <a-button v-show="isSubscribe"
                  size="small"
                  @click="cancelSubscribeReporter">구독중
        </a-button>
      </div>
      <div class="description-wrap" :class="noDescript">
        <div class="description" v-if="!editMode">
          <span v-if="description">{{ description }}</span>
          <span v-else class="no-description">등록된 자기소개가 없습니다.</span>
        </div>
        <a-textarea v-else-if="editMode"
                    class="edit-description-area"
                    placeholder="자기소개를 작성해주세요"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    maxlength="60"
                    @input="copiedDescriptionChange($event.target.value)"
                    :value="copiedDescription"></a-textarea>
        <span v-if="isMe">
          <a-button type="default"
                    size="small"
                    v-if="!editMode"
                    @click="toggleEditMode()">수정</a-button>
          <div v-else-if="editMode" style="float: right;">
            <span class="description-length">({{ descriptionLength || 0 }}/60)</span>
            <a-button type="default"
                      size="small"
                      @click="toggleEditMode()">취소</a-button>
          <a-button type="primary"
                    size="small"
                    :loading="descriptionLoading"
                    @click="updateDescription()">저장</a-button>
          </div>
        </span>
      </div>
      <div class="badge-wrap flex-container flex-between-sort flex-row">
        <a-badge @click="showSubListModal('readers')"
                 :count="readerList.length"
                 :overflow-count="999"
                 :numberStyle="badgeStyle">
          <div class="badge-box text-center">Readers</div>
        </a-badge>
        <a-badge @click="showSubListModal('reporters')"
                 :count="reporterList.length"
                 :overflow-count="999"
                 :numberStyle="badgeStyle">
          <div class="badge-box text-center">Reporter</div>
        </a-badge>
        <a-badge @click="showSubListModal('locals')"
                 :count="localList.length"
                 :overflow-count="999"
                 :numberStyle="badgeStyle">
          <div class="badge-box text-center">Locals</div>
        </a-badge>
        <a-modal :title="modalTitle"
                 v-model="modalVisible"
                 @ok="modalVisible = false">
          <ul class="subscribe-wrap">
            <li v-for="(user, index) in modalSubscribeList"
                :key="index"
                class="sub-item text-center"
                @click="routeProfilePage(user.userId)">
              <span class="sub-item-text">{{ user.nickName }}</span>
            </li>
          </ul>
        </a-modal>
      </div>
    </div>
    <div class="post-list-section">
      <virtual-list :postList="previewPostList"
                    :load-type="'user'"
                    :userId="isMe ? user.userId : info.userId "/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

const Toolbar = () => import('@/components/Toolbar');
const VirtualList = () => import('@/components/VirtualList');

export default {
  name: 'ProfilePage',
  components: {
    Toolbar,
    VirtualList,
  },
  props: {
    userId: {
      type: Number,
    },
  },
  watch: {
    async $route(to) {
      const { userId } = to.params;
      await this.$store.dispatch('anotherUser/fetchAnotherUser', userId);
      this.dataUpdate();
    },
  },
  computed: {
    ...mapState('anotherUser', [
      'info',
      'readerList',
      'reporterList',
      'localList',
      'isSubscribe',
    ]),
    ...mapState('user', [
      'user',
    ]),
    ...mapState('post', [
      'previewPostList',
    ]),
    ...mapGetters('user', [
      'avatar',
    ]),
    isMe() {
      return this.info.userId === this.$store.state.user.user.userId;
    },
    profilePath() {
      return this.isMe ? this.avatar : this.info.avatar;
    },
    noDescript() {
      return {
        'text-justify': this.description,
        'text-center': !this.description,
      };
    },
    descriptionLength() {
      if (this.copiedDescription) {
        return this.copiedDescription.length;
      }
    },
  },
  data() {
    return {
      badgeStyle: {backgroundColor: '#1F74FF'},
      editMode: false,
      description: '',
      copiedDescription: '',
      descriptionLoading: false,
      modalTitle: '',
      modalVisible: false,
      modalSubscribeList: [],
    };
  },
  methods: {
    ...mapMutations('post', {
      initPreviewList: 'INIT_PREVIEW_LIST',
    }),
    toggleEditMode() {
      this.editMode = !this.editMode;
      if (this.editMode) {
        this.copiedDescription = this.description;
      }
    },
    uploadProcess(e) {
      const file = e.target.files[0];
      if (/^image\//.test(file.type)) {
        const formData = new FormData();
        formData.append('image', file);
        const payload = {
          formData,
          nickName: this.user.nickName,
          userId: this.user.userId,
        };
        this.$store.dispatch('user/updateProfileImage', payload);
        this.$message.success('프로필 사진이 업데이트 되었습니다');
      }
    },
    async updateDescription() {
      this.descriptionLoading = true;
      await this.$store.dispatch('user/updateDescription', this.copiedDescription);
      if (this.$store.state.user.committed) {
        this.description = this.$store.state.user.user.description;
        this.$message.success('자기소개가 변경되었습니다');
      } else {
        this.$message.warning('다시 시도해주세요');
      }
      this.descriptionLoading = false;
      this.editMode = false;
    },

    async showSubListModal(dataType) {
      /**
       * fetchType 에 따라 보여주는 리스트가 달라야함
       * readers : 구독자들
       * reporters : 리포터들
       * locals : 지역들
       */
      const subDataMap = {
        readers: {
          title: '구독자들',
          data: this.readerList,
        },
        reporters: {
          title: '리포터들',
          data: this.reporterList,
        },
        locals: {
          title: '지역들',
          data: this.localList,
        },
      };
      this.modalTitle = subDataMap[dataType].title;
      this.modalSubscribeList = subDataMap[dataType].data;
      this.modalVisible = true;
    },
    routeProfilePage(userId) {
      this.$router.replace({name: 'ProfilePage', params: {userId}});
      this.modalVisible = false;
    },
    async dataUpdate() {
      this.description = this.isMe
        ? this.$store.state.user.user.description
        : this.$store.state.anotherUser.info.description;
      const userId = this.isMe ? this.user.userId : this.info.userId;
      await this.$store.dispatch('anotherUser/isSubscribe', {reader: this.user.userId, reporter: this.info.userId});
      await this.$store.dispatch('anotherUser/fetchSubscribeList', {fetchType: 'readers', userId});
      await this.$store.dispatch('anotherUser/fetchSubscribeList', {fetchType: 'reporters', userId});
      await this.$store.dispatch('anotherUser/fetchSubscribeList', {fetchType: 'locals', userId});
    },
    async subscribeReporter() {
      const payload = {
        me: this.$store.state.user.user.userId,
        another: this.info.userId,
      };
      await this.$store.dispatch('anotherUser/subscribeReporter', payload);
      const userId = this.isMe ? this.user.userId : this.info.userId;
      await this.$store.dispatch('anotherUser/fetchSubscribeList', {fetchType: 'readers', userId});
    },
    async cancelSubscribeReporter() {
      const payload = {
        me: this.$store.state.user.user.userId,
        another: this.info.userId,
      };
      await this.$store.dispatch('anotherUser/cancelSubscribeReporter', payload);
      const userId = this.isMe ? this.user.userId : this.info.userId;
      await this.$store.dispatch('anotherUser/fetchSubscribeList', {fetchType: 'readers', userId});
    },
    copiedDescriptionChange(e) {
      this.copiedDescription = e;
    },
  },
  async created() {
    await this.initPreviewList();
    await this.dataUpdate();
  },
};
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/mixin';
  @import './../assets/scss/theme/colors';

  .profile-container {
    width: 100%;
    height: 100%;
    padding: 50px 10px 20px; /* toolbar height */

    .user-header-section {
      @include box-shadow;
      width: 100%;
      padding: 15px 25px;

      .medal-wrap {
        .medal {
          color: $medal-silver;
        }
      }

      .score-wrap {
        @include v-text-align(25px);

        .score {
          @include font-size-regular;
          @include font-weight-5;
          color: $info;
        }
      }

      .avatar-wrap {
        .profile-upload-wrapper {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          border: 1px solid #e2e2e2;
          overflow: hidden;
          transition: ease-in-out 0.2s;

          .avatar-zone {
            width: 100%;
            height: 100%;

            .avatar {
              width: 100%;
              height: auto;
            }

            .default-profile {
              width: 100%;
              height: 100%;
              background-color: rgba(226, 226, 226, 0.4);
            }
          }
          .upload {
            position: absolute;
            cursor: pointer;
            opacity: 0;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .upload-text {
            @include font-size-small;
            color: #fff;
            position: absolute;
            width: 100%;
            background: rgba(151, 151, 151, 0.9);
            bottom: 0;
            text-align: center;
          }
        }
        .profile-upload-wrapper:hover {
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
      }

      .nickname-wrap {
        @include v-text-align(40px);

        .nickname {
          @include font-size-large;
          @include font-weight-5;
          color: $primary;
        }
      }

      .subscript-button-wrap {
        width: 100%;
        height: 30px;
      }

      .description-wrap {
        .description {
          margin: 10px 0;
          @include font-size-small;
          color: $info-blur;

          .no-description {
            @include font-size-small;
            color: $info-blur;
          }
        }

        .edit-description-area {
          margin: 10px 0;
        }

        .description-length {
          @include font-size-small;
          color: $info-blur;
          margin-right: 5px;
        }
      }

      .badge-wrap {
        margin: 15px 0;
        padding: 10px;

        .badge-box {
          @include v-text-align(40px);
          width: 20vw;
          height: 40px;
          border: 1px solid #eee;
          border-radius: 4px;
          cursor: pointer;
          transition: 0.2s ease-in-out;
        }

        .badge-box:hover {
          transform: translateY(-2px);
        }
      }
    }
  }

  .ant-modal-body {
    .subscribe-wrap {
      display: block;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 40vh;
      overflow-y: scroll;

      .sub-item {
        @include v-text-align(40px);
        width: 100%;
        border-bottom: 1px solid #e2e2e2;

        .sub-item-text {
          @include font-size-normal;
          color: $info;
        }
      }
    }
  }
</style>

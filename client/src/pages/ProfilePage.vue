<template>
  <div class="profile-container">
    <a-spin :spinning="pageSwitchLoading">
      <toolbar :title="'프로필'"/>
      <div class="user-header-section flex-container flex-column">
        <div class="flex-container flex-center-sort">
          <i class="fas fa-medal medal" :class="medalColorPicker"></i>
        </div>
        <div class="score-wrap text-center">
          <!-- 유저의 신뢰도 점수 -->
          <span class="score">{{ reliabilityScore }}</span>
        </div>
        <div class="avatar-wrap flex-container flex-center-sort">
          <div class="profile-upload-wrapper">
            <div class="avatar-zone">
              <img v-if="profilePath"
                   class="avatar"
                   :src="`http://localhost:3000/images/${profilePath}`"
                   alt="profile">
              <a-avatar v-else icon="user" :size="150"></a-avatar>
            </div>
            <label v-if="isMe" class="upload-text" for="upload">
              <a-popconfirm title="프로필 사진 변경"
                            @confirm="selectProfile"
                            @cancel="changeDefaultProfile"
                            okText="이미지 선택"
                            cancelText="기본 이미지로">
                <span class="back-drop"></span>
                <span class="edit-text">편집</span>
              </a-popconfirm>
            </label>
            <input v-if="isMe"
                   id="upload"
                   class="upload"
                   type="file"
                   accept="image/*"
                   ref="inputFile"
                   @change="uploadProcess">
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
                  class="sub-item flex-container flex-row"
                  @click="routeProfilePage(user.userId)">
                <a-avatar v-if="user.avatar" slot="avatar"
                          :src="`http://localhost:3000/images/${user.avatar}`"/>
                <a-avatar v-else slot="avatar" icon="user"></a-avatar>
                <div class="sub-item-text text-center">{{ user.nickName }}</div>
              </li>
            </ul>
          </a-modal>
        </div>
        <div v-if="!isMe" class="flex-container flex-end" style="padding-right: 10px;">
          <a-button size="small" @click="blockVisible = true">차단</a-button>
          <a-modal v-model="blockVisible"
                   title="리포터 차단하기"
                   okText="차단"
                   cancelText="취소"
                   @ok="userBlockProcess()"
                   :confirm-loading="modalLoading">
            <div class="modal-container">
              <div class="margin--bottom-20">
                차단할 리포터는 <span style="color: #1F74FF;">{{ info.nickName }}</span> 입니다.
              </div>
              <p class="info-text">해당 리포터를 차단하게되면, 관련된 뉴스들을 볼 수 없게됩니다.<br>차단하시겠습니까?</p>

              <p class="info-text">차단 후 이전 페이지로 돌아갑니다.</p>
            </div>
          </a-modal>
        </div>
      </div>
      <a-tabs defaultActiveKey="1" type="card">
        <a-tab-pane tab="게시물" key="1">
          <div class="post-list-section">
            <virtual-list :postList="previewPostList"
                          :load-type="'user'"
                          :userId="isMe ? user.userId : info.userId "
                          :avatar="profilePath"/>
          </div>
        </a-tab-pane>
        <a-tab-pane v-if="isMe" tab="스크랩한 게시물" key="2">
          <div class="post-list-section">
            <virtual-list :postList="scrapPostList"
                          :load-type="'scrap'"></virtual-list>
          </div>
        </a-tab-pane>
        <a-tab-pane v-if="isMe" tab="차단목록" key="3">
          <ul class="block-list-wrap">
            <li v-for="(user, index) in blockedUserList"
                :key="index" class="user-list-item flex-container flex-between-sort flex-row">
              <div class="block-avatar-wrap">
                <a-avatar v-if="user.avatar"
                          :src="`http://localhost:3000/images/${user.avatar}`"/>
                <a-avatar v-else icon="user"></a-avatar>
              </div>
              <div class="block-nickname-wrap text-center">
                {{ user.nickName }}
              </div>
              <div class="block-action-wrap">
                <a-popconfirm title="차단을 해제하시겠습니까?"
                              okText="해제"
                              cancelText="취소"
                              @confirm="cancelBlock(user.userId)"
                              placement="topRight">
                  <a-button size="small">차단 해제</a-button>
                </a-popconfirm>
              </div>
            </li>
          </ul>
        </a-tab-pane>
      </a-tabs>
    </a-spin>
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
      this.pageSwitchLoading = true;
      const { userId } = to.params;
      await this.$store.dispatch('anotherUser/fetchAnotherUser', userId);
      await this.dataUpdate();
      this.pageSwitchLoading = false;
    },
  },
  async created() {
    await this.initPreviewList();
    if (this.isMe) {
      await this.initScrapPostList();
      await this.initBlockedUserList();
      await this.$store.dispatch('user/fetchBlockUserList');
    }
    await this.dataUpdate();
  },
  computed: {
    ...mapState('anotherUser', [
      'info',
      'readerList',
      'reporterList',
      'localList',
      'isSubscribe',
      'reliabilityScore',
    ]),
    ...mapState('user', [
      'user',
      'blockedUserList',
    ]),
    ...mapState('post', [
      'previewPostList',
    ]),
    ...mapState('scrap', [
      'scrapPostList',
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
      return 0;
    },
    medalColorPicker() {
      switch (parseInt(this.reliabilityScore / 100, 10)) {
        case 0:
        case 1:
          return 'medal-bronze';
        case 2:
        case 3:
          return 'medal-silver';
        default:
          return 'medal-gold';
      }
    },
  },
  data() {
    return {
      badgeStyle: { backgroundColor: '#1F74FF' },
      editMode: false,
      description: '',
      copiedDescription: '',
      descriptionLoading: false,
      modalTitle: '',
      modalVisible: false,
      modalSubscribeList: [],
      pageSwitchLoading: false,
      blockVisible: false,
      modalLoading: false,
    };
  },
  methods: {
    ...mapMutations('post', {
      initPreviewList: 'INIT_PREVIEW_LIST',
    }),
    ...mapMutations('scrap', {
      initScrapPostList: 'INIT_SCRAP_POST_LIST',
    }),
    ...mapMutations('user', {
      initBlockedUserList: 'INIT_BLOCKED_USER_LIST',
      deleteBlockedUserListElement: 'DELETE_BLOCKED_USER_LIST_ELEMENT',
    }),
    toggleEditMode() {
      this.editMode = !this.editMode;
      if (this.editMode) {
        this.copiedDescription = this.description;
      }
    },
    selectProfile() {
      this.$refs.inputFile.click();
    },
    async changeDefaultProfile() {
      await this.$store.dispatch('user/changeDefaultProfile', { userId: this.user.userId });
    },
    uploadProcess(e) {
      const file = e.target.files[0];
      if (file && /^image\//.test(file.type)) {
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = (event) => {
        //   // something
        //   const image = new Image();
        //   image.src = event.target.result;
        //   image.onload = () => {
        //     // resize
        //     const canvas = document.createElement('canvas');
        //     const maxSize = 1280;
        //     let width = image.width;
        //     let height = image.height;
        //     if (width > height && width > maxSize) {
        //       height *= maxSize / width;
        //       width = maxSize;
        //     } else if (height > maxSize) {
        //       width *= maxSize / height;
        //       height = maxSize;
        //     }
        //     canvas.width = width;
        //     canvas.height = height;
        //     canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        //     const dataUrl = canvas.toDataURL('image/jpeg');
        //     const BASE64 = ';base64,';
        //
        //     if (dataUrl.indexOf(BASE64) === -1) {
        //       const parts = dataUrl.split(',');
        //       const contentType = parts[0].split(':')[1];
        //       const raw = parts[1];
        //       const blob = new Blob([raw], {
        //         type: contentType,
        //       });
        //       const formData = new FormData();
        //       formData.append('image', blob);
        //       const payload = {
        //         formData,
        //         nickName: this.user.nickName,
        //         userId: this.user.userId,
        //       };
        //       this.$store.dispatch('user/updateProfileImage', payload);
        //       this.$message.success('프로필 사진이 업데이트 되었습니다');
        //       return;
        //     }
        //
        //     const parts = dataUrl.split(BASE64);
        //     const contentType = parts[0].split(':')[1];
        //     const raw = window.atob(parts[1]);
        //     const rawLength = raw.length;
        //     const uInt8Array = new Uint8Array(rawLength);
        //     for (let i = 0; i < rawLength; i++) {
        //       uInt8Array[i] = raw.charCodeAt(i);
        //     }
        //     const blob = new Blob([uInt8Array], {
        //       type: contentType,
        //     });
        //
        //     const formData = new FormData();
        //     formData.append('image', blob);
        //     const payload = {
        //       formData,
        //       nickName: this.user.nickName,
        //       userId: this.user.userId,
        //     };
        //     console.log(blob);
        //     this.$store.dispatch('user/updateProfileImage', payload);
        //     this.$message.success('프로필 사진이 업데이트 되었습니다');
        //   };
        // };


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
      this.$router.replace({ name: 'ProfilePage', params: { userId } });
      this.modalVisible = false;
    },
    async dataUpdate() {
      this.description = this.isMe
        ? this.$store.state.user.user.description
        : this.$store.state.anotherUser.info.description;
      const userId = this.isMe ? this.user.userId : this.info.userId;
      await this.$store.dispatch('anotherUser/isSubscribe', { reader: this.user.userId, reporter: this.info.userId });
      await this.$store.dispatch('anotherUser/fetchSubscribeList', { fetchType: 'readers', userId });
      await this.$store.dispatch('anotherUser/fetchSubscribeList', { fetchType: 'reporters', userId });
      await this.$store.dispatch('anotherUser/fetchSubscribeList', { fetchType: 'locals', userId });
      await this.$store.dispatch('anotherUser/fetchUserReliabilityScore', { userId });
    },
    async subscribeReporter() {
      const payload = {
        me: this.$store.state.user.user.userId,
        another: this.info.userId,
      };
      await this.$store.dispatch('anotherUser/subscribeReporter', payload);
      const userId = this.isMe ? this.user.userId : this.info.userId;
      await this.$store.dispatch('anotherUser/fetchSubscribeList', { fetchType: 'readers', userId });
    },
    async cancelSubscribeReporter() {
      const payload = {
        me: this.$store.state.user.user.userId,
        another: this.info.userId,
      };
      await this.$store.dispatch('anotherUser/cancelSubscribeReporter', payload);
      const userId = this.isMe ? this.user.userId : this.info.userId;
      await this.$store.dispatch('anotherUser/fetchSubscribeList', { fetchType: 'readers', userId });
    },
    copiedDescriptionChange(e) {
      this.copiedDescription = e;
    },
    async cancelBlock(targetId) {
      const payload = { targetId };
      await this.$store.dispatch('user/cancelBlock', payload);
      await this.$store.dispatch('user/fetchBlockUserList');
      this.deleteBlockedUserListElement(targetId);
      this.$message.success('차단해제 완료');
    },
    async userBlockProcess() {
      this.modalLoading = true;
      const payload = {
        myUserId: this.user.userId,
        targetId: this.info.userId,
      };
      await this.$store.dispatch('user/blockUserProcess', payload);
      this.modalLoading = false;
      this.blockVisible = false;
      this.$message.success(`${this.info.nickName} 님을 차단했습니다.`);
      this.$router.replace({ name: 'LocalNewsTab' });
    },
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
      margin-bottom: 10px;

      .score-wrap {
        @include v-text-align(25px);

        .score {
          @include font-size-regular;
          @include font-weight-5;
          color: $info;
        }
      }

      .info-text {
        margin-top: 10px;
        @include font-size-normal;
        color: $info;
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
            position: relative;
            width: 100%;
            height: 100%;

            .avatar {
              width: 100%;
              height: auto;
            }
          }

          .upload {
            position: absolute;
            cursor: pointer;
            visibility: hidden;
            display: none;
            opacity: 0;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          .upload-text {
            @include font-size-small;
            @include v-text-align(30px);
            z-index: 100;
            color: #fff;
            position: absolute;
            width: 100%;
            background: rgba(151, 151, 151, 0.9);
            bottom: 0;
            text-align: center;
            cursor: pointer;

            .back-drop {
              position: absolute;
              top: 0;
              display: block;
              width: 100%;
              height: 150px;
              background-color: transparent;
            }

            .edit-text {
              width: 100%;
            }
          }
        }

        .profile-upload-wrapper:hover {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
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

    .block-list-wrap {
      margin: 0;
      padding: 0 0 20px 0;

      .user-list-item {
        width: 100%;
        height: 50px;
        padding: 0 20px;
        border-bottom: 1px solid #d7d7d7;
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
        display: flex;
        align-items: center;
        @include v-text-align(50px);
        width: 100%;
        border-bottom: 1px solid #e2e2e2;
        cursor: pointer;
        transition: .1s ease-in;

        &:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }

        .sub-item-text {
          width: 100%;
          @include font-size-normal;
          color: $info;
        }
      }
    }
  }
</style>

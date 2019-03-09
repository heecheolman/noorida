<template>
  <div class="profile-container">
    <toolbar :title="'프로필'" />
    <div class="user-header-section flex-container flex-column">
      <div class="medal-wrap flex-container flex-center-sort">
        <i class="fas fa-medal medal"></i>
      </div>
      <div class="score-wrap text-center">
        <span class="score">475</span>
      </div>
      <div class="avatar-wrap flex-container flex-center-sort">
        <img class="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
      </div>
      <div class="nickname-wrap text-center">
        <span class="nickname">{{ info.nickName }}</span>
      </div>
      <div class="subscript-button-wrap flex-container flex-center-sort" v-if="!isMe">
        <a-button type="primary" size="small">구독하기</a-button>
      </div>
      <div class="description-wrap" :class="noDescript">
        <div class="description" v-if="!editMode">
          <span v-if="info.description">{{ info.description }}</span>
          <span v-else class="no-description">등록된 자기소개가 없습니다.</span>
        </div>
        <a-textarea v-else-if="editMode"
                    class="edit-description-area"
                    placeholder="자기소개를 작성해주세요"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    v-model="copiedDescription"></a-textarea>
        <span v-if="isMe">
          <a-button type="default"
                    size="small"
                    v-if="!editMode"
                    @click="toggleEditMode()">수정</a-button>
          <div v-else-if="editMode" style="float: right;">
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
        <a-badge :count="1000"
                 :overflow-count="999"
                 :numberStyle="badgeStyle">
          <div class="badge-box text-center">Readers</div>
        </a-badge>
        <a-badge :count="99"
                 :overflow-count="999"
                 :numberStyle="badgeStyle">
          <div class="badge-box text-center">Reporter</div>
        </a-badge>
        <a-badge :count="9999"
                 :overflow-count="999"
                 :numberStyle="badgeStyle">
          <div class="badge-box text-center">Locals</div>
        </a-badge>
      </div>
    </div>
    <div class="post-list-section">
      <virtual-list :postList="previewPostList"
                    :load-type="'user'" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

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
  computed: {
    ...mapState('anotherUser', [
      'info',
    ]),
    ...mapState('post', [
      'previewPostList',
    ]),
    isMe() {
      return this.info.userId === this.$store.state.user.user.userId;
    },
    noDescript() {
      return {
        'text-justify': this.info.description,
        'text-center': !this.info.description,
      };
    },
  },
  data() {
    return {
      badgeStyle: { backgroundColor: '#1F74FF' },
      editMode: false,
      // 원본데이터
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      copiedDescription: '',
      descriptionLoading: false,
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
    async updateDescription() {
      this.descriptionLoading = true;
      // flow
      console.log('update description', this.copiedDescription);
      this.descriptionLoading = false;
      this.editMode = false;
    },
  },
  async created() {
    this.initPreviewList();
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
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 100px;
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
          color: $info;

          .no-description {
            @include font-size-small;
            color: $info-blur;
          }
        }

        .edit-description-area {
          margin: 10px 0;
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
</style>

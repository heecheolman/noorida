<template>
  <div>
    <toolbar :title="'뉴스'" />
    <div class="news-container">
      <a-spin :spinning="loading">
        <div class="news-title-wrap">
          <span class="news-title">{{ detailPost.title }}</span>
        </div>
        <div class="news-created-at-container">
          <span class="created-at">{{ detailPost.createdAt | absoluteDate }}</span>
        </div>

        <div class="news-content-wrap">
          <div class="ql-editor">
            <div v-html="detailPost.content"></div>

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
        </div>
        <profile-card />
      </a-spin>

      <a-divider />

      <div class="feedback-wrap">

        <h4 class="feedback-title text-center">이 기사가 어떠셨나요?</h4>
        <div class="emoji-area flex-container flex-center-sort">
          <a-radio-group defaultValue="" size="large" @change="updateEmoji">
            <a-radio-button value="like"><i class="far fa-thumbs-up"></i></a-radio-button>
            <a-radio-button value="smile"><i class="far fa-smile"></i></a-radio-button>
            <a-radio-button value="angry"><i class="far fa-angry"></i></a-radio-button>
            <a-radio-button value="sad"><i class="far fa-sad-tear"></i></a-radio-button>
          </a-radio-group>
        </div>

        <h4 class="feedback-title text-center">이 기사의 신뢰도는?</h4>
        <div class="reliability-area">
          <a-slider :marks="marks"
                    :min="-5"
                    :max="5"
                    :included="false"
                    :step="1"
                    @afterChange="updateReliability"/>
        </div>
      </div>
      <div class="comment-wrap">
        <a-comment class="comment-write-wrap">
          <a-avatar slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"/>
          <div slot="content">

            <a-form-item>
              <a-textarea :rows="1"
                          @change="setCommentContent($event.target.value)"
                          :value="commentContent" ></a-textarea>
            </a-form-item>
            <a-form-item>
              <a-button htmlType="submit"
                        :loading="submitting"
                        @click="handleSubmit"
                        size="small"
                        type="primary">댓글 작성</a-button>
            </a-form-item>
          </div>
        </a-comment>

        <a-list v-if="commentList.length"
                :dataSource="commentList"
                :header="`${commentList.length} ${commentList.length > 1 ? '개 댓글들 (최신순)' : '개 댓글 (최신순)'}`"
                itemLayout="horizontal">

          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-comment :author="item.nickName"
                       :avatar="item.avatar"
                       :content="item.commentContent"
                       :datetime="item.updatedAt | timeline">
            </a-comment>
          </a-list-item>

        </a-list>
        <div class="loadmore flex-container flex-center-sort">
          <a-button v-if="hasNextComment"
                    :loading="commentLoading"
                    @click="loadCommentList">댓글 더보기</a-button>
          <span v-else class="no-more-comment">
              댓글이 없습니다.
            </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import { mapState, mapMutations } from 'vuex';
  const Toolbar = () => import('@/components/Toolbar');
  const ProfileCard = () => import('@/components/ProfileCard');
  export default {
    name: 'PostDetailPage',
    components: {
      Toolbar,
      ProfileCard,
    },
    props: {
      contentId: {
        type: Number,
      },
    },

    computed: {
      ...mapState('comment', [
        'commentContent',
        'commentList',
        'commentLoading',
        'hasNextComment',
      ]),
      ...mapState('post', [
        'detailPost',
      ]),

    descriptionLength() {
      if (this.copiedDescription) {
        return this.copiedDescription.length;
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
    async created() {
      this.loading = true;
      await this.$store.dispatch('post/fetchDetailPost', this.contentId);
      this.loading = false;
      this.initCommentData();
      this.loadCommentList();
    },
    data() {
      return {
        loading: true,
        contentData: {},
        marks: {
          '-5': '-5',
          '-4': '-4',
          '-3': '-3',
          '-2': '-2',
          '-1': '-1',
          0: '0',
          1: '1',
          2: '2',
          3: '3',
          4: '4',
          5: '5',
        },
        submitting: false,
        value: '',
        reliabilityOldValue: '',
      };
    },
    methods: {
      ...mapMutations('comment', {
        setCommentContent: 'SET_COMMENT_CONTENT',
        initCommentData: 'INIT_COMMENT_DATA',
        initCommentContent: 'INIT_COMMENT_CONTENT',
      }),
      async loadCommentList() {
        await this.$store.dispatch('comment/loadCommentList', this.contentId);
      },
      handleSubmit() {
        /**
         * 1. 댓글리스트를 불러옴 (최신순 15개 단위)
         *   1-1. 만약 더보기를 누르면 15개씩 쌓임
         * 2. 댓글을 작성 ( 작성중이라면 submitting 로딩걸어야함 )
         * 3. db 에 저장되고
         * 4. 현재 작성된것은 맨 위로 붙임 this.commentList.unshift({ data }); */
        const payload = {
          contentId: this.contentId,
          userId: this.$store.state.user.user.userId,
          commentContent: this.commentContent,
        };
        /**
         * 댓글 작성 후의 보여지는 뷰와 로직에대해서 고민해봐야함
         */
        this.$store.dispatch('comment/writeComment', payload);
        this.initCommentContent();
        this.initCommentData();
        this.loadCommentList();
      },
      updateEmoji(e) {
        console.log('이모지 수정', e.target.value);
      },
      updateReliability(value) {
        if (this.reliabilityOldValue !== value) {
          this.reliabilityOldValue = value;
          console.log('신뢰도 수정', value);
        }
      },
    },

  };

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
  .news-container {
    width: 100%;
    height: 100%;
    padding: 40px 10px 20px;
    word-break: break-all;
    overflow-y: scroll;
    .news-title-wrap {
      display: block;
      position: relative;
      width: 100%;
      height: auto;
      .news-title {
        @include font-size-large;
        @include v-text-align(40px);
        color: #202124;
      }
    }
    .news-created-at-container {
      z-index: -10;
      display: block;
      width: 100%;
      position: relative;
      height: 20px;
      .created-at {
        @include font-size-normal;
        @include font-weight-4;
        letter-spacing: 0.2px;
        color: $info-blur;
      }

    }
    .news-content-wrap {
      width: 100%;
      height: auto;
      margin-bottom: 50px;
    }
    .feedback-wrap {
      @include box-shadow;
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      .feedback-title {
        @include font-size-small;
        @include v-text-align(25px);
        color: $primary;


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
      .emoji-area {
        margin-bottom: 20px;
      }
    }
    .loadmore {
      //@include box-shadow;
      width: 100%;
      height: 40px;
      .no-more-comment {
        @include font-size-normal;
        color: $info-blur;
      }
    }
    .comment-write-wrap {
      @include box-shadow;
      margin-top: 20px;
      padding: 10px;
    }
  }
</style>

<template>
  <div>
    <toolbar :title="'뉴스'" />
      <div class="news-container">
        <a-spin :spinning="loading">
          <div class="news-title-wrap">
            <span class="news-title">{{ detailPost.title }}</span>
          </div>
          <div class="location-wrap flex-container flex-between-sort">
            <span class="location">
              <a-icon type="environment"
                      theme="filled"
                      style="margin-right: 4px; "/>{{ detailPost.localName }}
            </span>
            <a-popover title="게시글을 삭제하시겠습니까?"
                       placement="topRight"
                       trigger="click"
                       v-model="deletePopvoerVisible"
                       v-if="isMe">
              <div slot="content" class="flex-container flex-between-sort">
                <a-button size="small" @click="deletePopvoerVisible=false">취소</a-button>
                <a-button size="small" type="primary" @click="deleteNews">삭제</a-button>
              </div>
              <a-button type="dashed"
                        @click="deletePopvoerVisible=false">
                <a-icon type="delete"/>
              </a-button>
            </a-popover>
          </div>
          <div class="news-created-at-container flex-container flex-between-sort flex-row">
            <span class="created-at">{{ detailPost.createdAt | absoluteDate }}</span>
            <span v-if="!isMe"
                  class="scrap-icon flex-container flex-center-sort"
                  @click="updateContentScrap">
              <a-icon type="book" :theme="isScrapped" />
            </span>
          </div>
          <div class="news-content-wrap">
            <div class="ql-editor">
              <div v-html="detailPost.content"></div>
            </div>
          </div>
          <profile-card />
        </a-spin>
        <div class="feedback-wrap">

          <h4 class="feedback-title text-center">이 기사가 어떠셨나요?</h4>
          <div class="emoji-area flex-container flex-center-sort">
            <a-radio-group size="large"
                           :disabled="isMe"
                           :defaultValue="userEmotion.toString()"
                           @change="updateEmoji">
              <a-badge :count="postEmotions.like"
                       :overflow-count="9999"
                       :numberStyle="emotionCountStyle">
                <a-radio-button value="1"><i class="far fa-thumbs-up"></i></a-radio-button>
              </a-badge>
              <a-badge :count="postEmotions.happy"
                       :overflow-count="9999"
                       :numberStyle="emotionCountStyle">
                <a-radio-button value="2"><i class="far fa-smile"></i></a-radio-button>
              </a-badge>
              <a-badge :count="postEmotions.angry"
                       :overflow-count="9999"
                       :numberStyle="emotionCountStyle">
                <a-radio-button value="3"><i class="far fa-angry"></i></a-radio-button>
              </a-badge>
              <a-badge :count="postEmotions.sad"
                       :overflow-count="9999"
                       :numberStyle="emotionCountStyle">
                <a-radio-button value="4"><i class="far fa-sad-tear"></i></a-radio-button>
              </a-badge>
            </a-radio-group>
          </div>

          <h4 v-if="!isEvaluated" class="feedback-title text-center">이 기사의 신뢰도는?</h4>
          <div class="reliability-area">
            <a-slider v-if="!isEvaluated"
                      :disabled="isMe"
                      :marks="marks"
                      :min="-5"
                      :max="5"
                      :included="false"
                      :step="1"
                      @afterChange="updateReliability"/>
          </div>
          <h4 class="feedback-info text-center" v-if="isEvaluated">이미 신뢰도를 평가하셨습니다.</h4>
          <div v-if="!isMe" class="flex-container flex-center-sort">
            <a-popconfirm title="게시글이나 유저에대한 신고나 차단"
                          okText="신고하기"
                          cancelText="차단하기"
                          @confirm="decVisible = true"
                          @cancel="blockVisible = true">
              <a-button :size="'small'">신고 및 차단</a-button>
            </a-popconfirm>
          </div>
        </div>
        <div class="comment-wrap">
          <a-comment class="comment-write-wrap">
            <a-avatar v-if="user.avatar" slot="avatar"
                      :src="`http://localhost:3000/images/${user.avatar}`"/>
            <a-avatar v-else slot="avatar" icon="user"></a-avatar>
            <div slot="content">

              <a-form-item>
                <a-textarea :rows="1"
                            :maxlength="'200'"
                            @change="setCommentContent($event.target.value)"
                            :value="commentContent" ></a-textarea>
                <span class="comment-guide">({{ commentLength }}/200)</span>
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
                  :header="`${commentList.length} ${commentList.length > 1
                    ? '개 댓글들 (최신순)'
                    : '개 댓글 (최신순)'}`"
                  itemLayout="horizontal">

            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-comment :author="item.nickName"
                         :content="item.commentContent"
                         :datetime="item.updatedAt | timeline">
                <a-avatar v-if="item.avatar" slot="avatar" :src="`http://localhost:3000/images/${item.avatar}`"></a-avatar>
                <a-avatar v-else slot="avatar" icon="user"></a-avatar>
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
    <a-modal v-model="decVisible"
             title="게시글 신고하기"
             okText="신고"
             cancelText="취소"
             @ok="declarationPostProcess()"
             :confirm-loading="modalLoading">
      <div class="modal-container">
        <div class="margin--bottom-10">
          <h4>신고 종류</h4>
          <a-checkbox-group :options="declarationOptions"
                            @change="onChange"
                            v-model="decCheckedList"></a-checkbox-group>
        </div>
        <a-textarea v-model="decEtcContent" :disabled="!etcChecked"></a-textarea>
        <p class="info-text">
          * 허위신고일 경우 불이익이 갈 수 있습니다.
        </p>
      </div>
    </a-modal>
    <a-modal v-model="blockVisible"
             title="리포터 차단하기"
             okText="차단"
             cancelText="취소"
             @ok="userBlockProcess()"
             :confirm-loading="modalLoading">
      <div class="modal-container">
        <div class="margin--bottom-20">
          차단할 리포터는 <span style="color: #1F74FF;">{{ profileCard.nickName }}</span> 입니다.
        </div>
        <p class="info-text">해당 리포터를 차단하게되면, 관련된 뉴스들을 볼 수 없게됩니다.<br>차단하시겠습니까?</p>
        <p class="info-text">차단 후 이전 페이지로 돌아갑니다.</p>
      </div>
    </a-modal>
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
    ...mapState('user', [
      'user',
    ]),
    ...mapState('comment', [
      'commentContent',
      'commentLength',
      'commentList',
      'commentLoading',
      'hasNextComment',
    ]),
    ...mapState('post', [
      'detailPost',
      'profileCard',
      'evaluationScore',
      'isEvaluated',
      'contentScrapState',
      'userEmotion',
      'postEmotions',
    ]),
    isScrapped() {
      if (typeof this.contentScrapState === 'boolean') {
        return this.contentScrapState ? 'filled' : 'outlined';
      }
      return 'filled';
    },
    isMe() {
      return this.user.userId === this.detailPost.userId;
    },
    etcChecked() {
      return this.decCheckedList.indexOf('기타') !== -1;
    },
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch('post/insertViewCount', { userId: this.user.userId, contentId: this.contentId });
    await this.$store.dispatch('post/fetchDetailPost', this.contentId);
    await this.$store.dispatch('post/isEvaluated', {
      userId: this.user.userId,
      contentId: this.contentId,
    });
    if (!this.isMe) {
      await this.$store.dispatch('post/getUserEmotion', { userId: this.user.userId, contentId: this.contentId });
      await this.$store.dispatch('post/getEmotionList', { contentId: this.contentId });
    }
    await this.$store.dispatch('post/getUserReliabilityScore');
    await this.$store.dispatch('post/contentScrappedCheck', { userId: this.user.userId, contentId: this.contentId });
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
      evaluating: false,
      emotionCountStyle: {
        backgroundColor: '#1F74FF',
      },
      decVisible: false,
      blockVisible: false,
      declarationOptions: [
        { label: '명예훼손', value: '명예훼손' },
        { label: '선정성', value: '선정성' },
        { label: '욕설', value: '욕설' },
        { label: '허위사실 유포', value: '허위사실 유포' },
        { label: '기타', value: '기타' },
      ],
      decCheckedList: [],
      decEtcContent: '',
      modalLoading: false,
      deletePopvoerVisible: false,
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
        userId: this.user.userId,
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
    async updateEmoji(e) {
      const payload = {
        contentId: this.contentId,
        userId: this.user.userId,
        emotionCode: e.target.value,
      };
      await this.$store.dispatch('post/updatePostEmotion', payload);
      this.$message.success('감정이 적용되었습니다');
      await this.$store.dispatch('post/getEmotionList', { contentId: this.contentId });
    },
    updateReliability(value) {
      const vm = this;
      if (this.reliabilityOldValue !== value) {
        const modalRef = this.$confirm({
          title: '평가하기',
          content: `${value} 점수로 평가하시겠습니까? 평가 후에는 재평가할 수 없습니다`,
          okText: '평가',
          cancelText: '취소',
          onOk: async () => {
            vm.evaluating = true;
            const payload = {
              userId: vm.$store.state.user.user.userId,
              contentId: vm.contentId,
              score: value,
            };
            await vm.$store.dispatch('post/evaluateReliabilityScore', payload);
            vm.evaluating = false;
            vm.$message.success(`${value} 점수를 주었습니다!`);
          },
          afterClose: () => {
            modalRef.destroy();
          },
        });
        this.reliabilityOldValue = value;
      }
    },
    async updateContentScrap() {
      const payload = {
        userId: this.user.userId,
        contentId: this.contentId,
      };
      if (this.contentScrapState) {
        await this.$store.dispatch('post/cancelContentScrapping', payload);
        this.$message.success('스크랩 목록에서 제거되었습니다.');
      } else {
        await this.$store.dispatch('post/contentScrapping', payload);
        this.$message.success('스크랩목록에 추가되었습니다.');
      }
    },
    declarationPostProcess() {
      const payload = {
        target: this.contentId,
        decCheckedList: this.decCheckedList,
        decEtcContent: this.decEtcContent,
      };
      console.log(payload);
      this.decVisible = false;
    },
    async userBlockProcess() {
      this.modalLoading = true;
      const payload = {
        myUserId: this.user.userId,
        targetId: this.profileCard.userId,
      };
      await this.$store.dispatch('user/blockUserProcess', payload);
      this.modalLoading = false;
      this.blockVisible = false;
      this.$message.success(`${this.profileCard.nickName} 님을 차단했습니다.`);
      this.$router.replace({ name: 'LocalNewsTab' });
    },

    async deleteNews() {
      const payload = {
        userId: this.user.userId,
        contentId: this.contentId,
      };
      await this.$store.dispatch('post/deleteNews', payload);
      this.$message.success('삭제되었습니다');
      this.$router.push({ name: 'LocalNewsTab' });
    },

    onChange(checkedValues) {
      if (checkedValues.length >= 2) {
        this.declarationOptions = this.declarationOptions.map((option) => {
          if (!checkedValues.includes(option.value)) {
            return { ...option, disabled: true };
          }
          return { ...option };
        });
      } else {
        this.declarationOptions = this.declarationOptions
          .map(option => ({ ...option, disabled: false }));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/mixin';
  @import './../assets/scss/theme/colors';
  textarea {
    resize: none;
  }

  .news-container {
    width: 100%;
    height: 100%;
    padding: 40px 10px 20px;
    word-break: break-all;
    overflow-y: scroll;

    .news-title-wrap {
      width: 100%;
      height: auto;
      border-bottom: 1px solid #d7d7d7;
      margin-bottom: 10px;

      .news-title {
        @include font-size-large;
        @include v-text-align(40px);
        color: $primary;
      }
    }

    .location-wrap {
      width: 100%;
      height: auto;

      .location {
        @include font-size-normal;
        @include font-weight-5;
        color: $primary;
      }
    }

    .news-created-at-container {
      z-index: -10;
      /*display: block;*/
      width: 100%;
      /*position: relative;*/
      @include v-text-align(40px);

      .created-at {
        @include font-size-normal;
        @include font-weight-4;
        letter-spacing: 0.2px;
        color: $info-blur;
      }

      .scrap-icon {
        cursor: pointer;
        width: 40px;
        height: 40px;
        font-size: 30px;
        color: $primary;
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
      }

      .feedback-info {
        @include font-size-small;
        @include v-text-align(25px);
        color: $info-blur;
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

      .comment-guide {
        @include font-size-small;
        color: $info-blur;
      }
    }
  }

  .modal-container {
    width: 100%;
    height: auto;

    .info-text {
      margin-top: 10px;
      @include font-size-normal;
      color: $info;
    }
  }
</style>

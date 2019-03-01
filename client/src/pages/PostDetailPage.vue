<template>
  <div>
    <toolbar :title="'뉴스'" />
    <a-skeleton active :loading="loading">
      <div class="news-container" v-if="contentData">
        <div class="news-title-wrap">
          <span class="news-title">{{ contentData.title }}</span>
        </div>
        <div class="news-created-at-container">
          <span class="created-at">{{ contentData.createdAt | absoluteDate }}</span>
        </div>
        <div class="news-content-wrap">
          <div class="ql-editor">
            <div v-html="contentData.content"></div>
          </div>
        </div>
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

          <a-list v-if="commentList.length"
                  :dataSource="commentList"
                  :header="`${commentList.length} ${commentList.length > 1 ? 'replies' : 'reply'}`"
                  itemLayout="horizontal">

            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-comment :author="item.author"
                         :avatar="item.avatar"
                         :content="item.content"
                         :datetime="item.datetime">
              </a-comment>
            </a-list-item>

          </a-list>
          <div class="loadmore flex-container flex-center-sort">
            댓글 더보기
          </div>
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
        </div>
      </div>
    </a-skeleton>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'PostDetailPage',
  components: {
    Toolbar,
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
    ]),
  },
  async created() {
    this.loading = true;
    this.contentData = await this.$api.getPostContent(this.contentId)
      .then(result => result.data)
      .catch(err => err);
    this.loading = false;
    this.initComment();
  },
  data() {
    return {
      loading: true,
      contentData: null,
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
      initComment: 'INIT_COMMENT',
    }),
    handleSubmit() {
      /**
       * 1. 댓글리스트를 불러옴 (최신순 15개 단위)
       *   1-1. 만약 더보기를 누르면 15개씩 쌓임
       * 2. 댓글을 작성 ( 작성중이라면 submitting 로딩걸어야함 )
       * 3. db 에 저장되고
       * 4. 현재 작성된것은 맨 위로 붙임 this.commentList.unshift({ data }); */

      console.log(this.commentContent);
      console.log('contentId', this.contentId);
      console.log('userId', this.contentData.userId);
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
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';
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
      height: 40px;

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
      @include font-size-normal;
      @include font-weight-3;
      letter-spacing: 0.2px;

      .created-at {
        color: $info;
      }
    }

    .news-content-wrap {
      width: 100%;
      height: auto;
      margin-bottom: 50px;
    }

    .feedback-wrap {
      width: 100%;
      padding: 10px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
      border-radius: 7px;
      margin-bottom: 20px;

      .feedback-title {
        @include font-size-small;
        @include v-text-align(25px);
        color: $primary;
      }

      .emoji-area {
        margin-bottom: 20px;
      }
    }
    .loadmore {
      width: 100%;
      height: 40px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
      border-radius: 7px;
    }

    .comment-write-wrap {
      margin-top: 20px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
      border-radius: 7px;
      padding: 10px;
    }
  }
</style>

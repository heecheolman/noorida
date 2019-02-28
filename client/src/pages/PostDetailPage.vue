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
      </div>
    </a-skeleton>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

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
  async created() {
    this.loading = true;
    this.contentData = await this.$api.getPostContent(this.contentId)
      .then(result => result.data)
      .catch(err => err);
    this.loading = false;
  },
  data() {
    return {
      loading: true,
      contentData: null,
    };
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
    }
  }
</style>

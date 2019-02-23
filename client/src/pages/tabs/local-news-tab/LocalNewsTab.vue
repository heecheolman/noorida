<template>
  <div>Local
    {{ address }}
    {{ placeId }}
    <a-list
      itemLayout="horizontal"
      :dataSource="localPreviewPostList"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-list-item-meta :description="item.content">
          <a slot="title">{{ item.title }}</a>
          <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <!--<preview-post v-for="(previewPost, index) in localPreviewPostList"-->
                  <!--:key="index"-->
                  <!--:preview-post="previewPost"/>-->
  </div>
</template>

<script>
import PreviewPost from '@/components/PreviewPost';
import { mapState } from 'vuex';

export default {
  name: 'LocalNewsTab',
  components: {
    PreviewPost,
  },
  computed: {
    ...mapState('login', [
      'address',
      'placeId',
    ]),
    ...mapState('post', [
      'localPreviewPostList',
    ]),
  },
  async created() {
    await this.$store.dispatch('post/getLocalPreviewPostList', this.address);
  },
};
</script>

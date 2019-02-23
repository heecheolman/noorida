<template>
  <div>Local
    {{ address }}
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
    ...mapState('post', [
      'localPreviewPostList',
    ]),
  },
  data() {
    return {
      address: this.$store.state.user.location.address,
    };
  },
  async created() {
    await this.$store.dispatch('post/getLocalPreviewPostList');
  },
};
</script>

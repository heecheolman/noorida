<template>
  <a-list>
    <div class="padding--10">
      <a-list-item v-for="item in searchPostList" :key="item.contentId" class="box-size"
                   @click="routeDetailPage(item.contentId)">
        <a-list-item-meta>
          <a slot="title" class="title">{{ item.title }}</a>
          <span slot="description" class="title-nickname">{{ item.nickName || '지역이름' }}</span>
            <a-avatar v-if="item.avatar" slot="avatar" :src="`http://localhost:3000/images/${item.avatar}`"/>
            <a-avatar v-else slot="avatar" icon="user"></a-avatar>
        </a-list-item-meta>
      </a-list-item>
    </div>
  </a-list>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PostSearchTab',
  data() {
    return {

    };
  },
  computed: {
    ...mapState('search', [
      'searchPostList',
    ]),
  },
  methods: {
    routeDetailPage(contentId) {
      if (contentId) {
        this.$router.push({
          name: 'PostDetailPage',
          params: { contentId },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .title{
    font-size: 15px;
  }
  .title-nickname{
    font-size: 13px;
  }
  .padding--10{
    padding: 10px;
  }
</style>

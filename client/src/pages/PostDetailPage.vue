<template>
  <div>
    {{ contentId }}
    <a-skeleton active :loading="loading">
      {{ contentData }}
    </a-skeleton>
  </div>
</template>

<script>
export default {
  name: 'PostDetailPage',
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

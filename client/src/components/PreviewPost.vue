<template>
  <div>
    {{ previewPost.localName }}
    {{ previewPost.title }}
    {{ previewPost.content }}
    {{ previewPost.nickName }}
    {{ previewPost.updatedAt }}
  </div>
</template>

<script>
export default {
  name: 'PreviewPost',
  props: {
    previewPost: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

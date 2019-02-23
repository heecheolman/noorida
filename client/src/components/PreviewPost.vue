<template>
  <div>
    {{ previewPost.localName }}
    {{ previewPost.title }}
    {{ previewPost.content }}
    {{ previewPost.nickName }}
    {{ previewPost.updatedAt }}
    민지 테스트
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

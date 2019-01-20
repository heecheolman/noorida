<template>
  <div class="page">
    <vs-card>
      <div slot="header">
        <h3>{{ title }}</h3>
      </div>
      <div>
        <span>{{ contents }}</span>
      </div>
    </vs-card>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      title: 'Login Page',
      contents: '로그인 페이지입니다.',
    };
  },
};
</script>

<style lang="scss" scoped>
  .page {
    width: 100%;
    height: 100%;
    background-color: rgb(36, 33, 69);
  }
</style>

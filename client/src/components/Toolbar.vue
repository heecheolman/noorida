<template>
  <div class="toolbar">
    <div class="align-pivot-box">
      <a-button type="default"
                shape="circle"
                @click="routeMainPage()">
        <a-icon type="swap-left"/>
      </a-button>
    </div>

    <span class="title">{{ title }}</span>

    <div class="align-pivot-box">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  props: {
    title: {
      type: String,
    },
  },
  methods: {
    routeMainPage() {
      this.$router.replace({ name: 'LocalNewsTab' });
    },
  },
};
</script>

<style lang="scss" scoped>
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;
    height: 40px;

    .align-pivot-box {
      width: 50px;
    }

    .title {
      color: #1f74ff;
    }
  }
</style>

<template>
  <a-list :loading="loading">
    <div class="padding--10">
        <a-list-item v-for="item in localList" :key="item.localId"
                     @click="routeLocal(item.localId, item.localName, item.userId)">
            <a-icon type="environment" class="design-icon"/>
            <span class="design-title" >{{ item.localName }}</span>
        </a-list-item>
    </div>
  </a-list>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LocalSearchTab',
  data() {
    return {

    };
  },
  computed: {
    ...mapState('search', [
      'localList',
      'loading',
    ]),
  },
  methods: {
    async routeLocal(itemId, itemName, itemUserId) {
      this.$router.push({
        name: 'SearchAreaPage',
        params: { localId: itemId, localName: itemName, userId: itemUserId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .design-icon{
    font-size: 23px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .design-title{
    font-size: 13px;
    line-height: 3;
  }
  .padding--10{
    padding: 10px;
  }
</style>

<template>
  <a-list :loading="loading">
    <div class="padding--10">
      <a-list>
        <a-list-item v-for="item in localList" :key="item.localId"
                     @click="routeLocal(item.localId, item.localName)">
            <a-icon type="environment" class="design-icon"/>
            <span class="design-title" >{{ item.localName }}</span>
        </a-list-item>
      </a-list>
    </div>
  </a-list>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'LocalSearchTab',
  data() {
    return {
      // inputData: this.$store.state.search.contents,
      // address: this.$store.state.search.localName,
      // userName: this.$store.state.search.userName,
      // localNameList: this.$store.state.search.localNameList,
    };
  },
  created() {
    // this.initPreviewList();
    // this.initDetailPost();
    // this.initProfileCard();
    // initPreviewPostList.nickName = this.userName;
  },
  components: {
    // AListItem,
    // PreviewPost,
    // VirtualList,
    // contents,
  },
  computed: {
    ...mapState('search', [
      'localList',
      'loading',
    ]),
  },
  methods: {
    ...mapMutations('post', {
      // initPreviewList: 'INIT_PREVIEW_LIST',
      // initDetailPost: 'INIT_DETAIL_POST',
      // initProfileCard: 'INIT_PROFILE_CARD',
    }),
    // async routeLocal() {
    //   this.$router.push({
    //     name: 'SearchLocalPage',
    //     // params: { localId },
    //   });
    // },
    async routeLocal(itemId, itemName) {
      console.log(`지역을 클릭함! ID는 ${itemId} 입니당!`);
      this.$router.push({
        name: 'SearchAreaPage',
        params: { localId: itemId, localName: itemName },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .design-icon{
    font-size: 25px;
    /* margin-right: 10px; */
    padding-left: unset;
    margin-right: 20px;
    margin-top: 10px;
  }
  /*.Local-card{*/
    /*margin: 20px;*/
    /*border-style: dashed;*/
    /*height: 73px;*/
  /*}*/
  .design-title{
    font-size: 15px;
    /*font-weight: bold;*/
  }
  .padding--10{
    padding: 10px;
  }
</style>

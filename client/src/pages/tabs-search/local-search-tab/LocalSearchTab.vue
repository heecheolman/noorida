<template>

  <div class="padding--10">
    <a-list>
      <a-list-item v-for="item in localNameList" :key="item.id" @click="routeLocal(item.id)">
          <a-icon type="environment" class="design-icon"/>
          <span class="design-title" >{{ item.localName }}</span>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
// import AListItem from "ant-design-vue/es/list/Item";

const PreviewPost = () => import('@/components/PreviewPost');
const VirtualList = () => import('@/components/VirtualList');
// const contents = () => import('@/pages/tabs-search/local-search-tab');
//
// const data = [
//   {
//     title: 'Ant Design Title 1',
//   },
//   {
//     title: 'Ant sdffsfdgfdgDesign Title 1',
//   },
// ]
export default {
  name: 'LocalSearchTab',
  data() {
    return {
      // inputData: this.$store.state.search.contents,
      // address: this.$store.state.search.localName,
      // userName: this.$store.state.search.userName,
      localNameList: this.$store.state.search.localNameList,
      // titles: [{ id: 1, Name: '직산읍' },
      //   { id: 2, Name: '성환읍' },
      //   { id: 3, Name: '강남' },
      //   { id: 4, Name: '백사면' },
      //   { id: 5, Name: '두정동' }],
    };
  },
  created() {
    this.initPreviewList();
    this.initDetailPost();
    this.initProfileCard();
    // initPreviewPostList.nickName = this.userName;
  },
  components: {
    // AListItem,
    PreviewPost,
    VirtualList,
    // contents,
  },
  computed: {
    ...mapState('post', [
      'previewPostList',
    ]),
  },
  methods: {
    ...mapMutations('post', {
      initPreviewList: 'INIT_PREVIEW_LIST',
      initDetailPost: 'INIT_DETAIL_POST',
      initProfileCard: 'INIT_PROFILE_CARD',
    }),
    // async routeLocal() {
    //   this.$router.push({
    //     name: 'SearchLocalPage',
    //     // params: { localId },
    //   });
    // },
    async routeLocal(itemId) {
      console.log(`지역을 클릭함! ID는 ${itemId} 입니당!`);
      this.$router.push({
        name: 'SearchAreaPage',
        params: { localId: itemId },
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
  }
  /*.Local-card{*/
    /*margin: 20px;*/
    /*border-style: dashed;*/
    /*height: 73px;*/
  /*}*/
  .design-title{
    font-size: 20px;
  }
  .padding--10{
    padding: 10px;
  }
</style>

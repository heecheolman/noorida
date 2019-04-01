<template>
  <div>
    <toolbar :title="'검색'" />
    <div class="">
      <div class="design-card text-center">
        <!--{{ LOCAL_NAME }}-->
        {{ localNameList[localId - 1].localName }}
      </div>
      <div class="button-common">
        <a-button >구독</a-button>
      </div>
      <div class="margin--10">
        <virtual-list :post-list="previewPostList"
                      :load-type="'local'"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

const Toolbar = () => import('@/components/Toolbar');
const PreviewPost = () => import('@/components/PreviewPost');
const VirtualList = () => import('@/components/VirtualList');

export default {
  name: 'SearchAreaPage',
  components: {
    Toolbar,
    PreviewPost,
    VirtualList,
  },
  props: {
    localId: {
      type: Number,
    },
  },
  computed: {
    ...mapState('post', [
      'previewPostList',
    ]),
    ...mapState('search', [
      'loadLocalData',
      'localNameList',
    ]),
  },
  data() {
    return {
      loading: true,
      address: this.$store.state.user.address,
      // localName: this.$store.state.search.localName,
      // localNameList: this.$store.state.search.localNameList,
      // Name: '',
    };
  },
  async created() {
    this.loading = true;
    // await this.$store.dispatch('post/loadLocalPostList', this.localId);
    // await this.$store.dispatch('search/loadLocalData', this.localId);
    this.loading = false;
    // if (this.localId === this.localNameList.localId) {
    //   this.Name = this.localNameList.localName;
    // };
    console.log(this.localNameList[this.localId - 1].localName);
  },
  methods: {
    ...mapMutations('post', {
      initPreviewList: 'INIT_PREVIEW_LIST',
      initDetailPost: 'INIT_DETAIL_POST',
      initProfileCard: 'INIT_PROFILE_CARD',
    }),
  },
};
</script>

<style scoped>

  .margin--10{
    margin: 15px;
  }
  .design-card{
    margin: 60px auto 25px auto;
    width: 130px;
    background-color: #6299ff;
    border-radius: 100px;
    height: 130px;
    font-size: 30px;
    color: black;
    line-height: 4.3;
  }
  .button-common{
    text-align: center;
  }
</style>

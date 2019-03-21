<template>
  <div class="flex-container flex-center-sort">
    <toolbar :title="'검색'" />
    <div>
      <div class="flex-center-sort">
        <br /><br />
        <a-input-search
          placeholder="input search text"
          @search="onSearch"
          enterButton
          v-model="searchData"></a-input-search>
        <br /><br />
      </div>
      <div>
        <div>
          <header style="{
                          zIndex: 100;
                       }">
            <div class="flex-between-sort flex-row tab-design">
              <router-link :to="{ name: 'LocalSearchTab' }"
                           tag="button"
                           active-class= "active"
                           class="design-box">{{ tab.pane1 }}</router-link>
              <router-link :to="{ name: 'ReporterSearchTab' }"
                           tag="button"
                           class="design-box"
                           active-class= "active">{{ tab.pane2 }}</router-link>
              <router-link :to="{ name: 'PostSearchTab' }"
                           tag="button"
                           active-class= "active"
                           class="design-box">{{ tab.pane3 }}</router-link>
            </div>
          </header>
          <div class="content-wrap">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ALayoutSider from "ant-design-vue/es/layout/Sider";
const Toolbar = () => import('@/components/Toolbar');

export default {
  name: 'SearchPage',
  components: {
    // ALayoutSider,
    Toolbar,
  },
  data() {
    return {
      tab: {
        pane1: '지역',
        pane2: '리포터',
        pane3: '게시글',
      },
      searchData: '',
    };
  },
  methods: {
    async onSearch() {
      await this.$store.dispatch('search/searchProcess', {
        searchContent: this.searchData, // 검색창에 입력받은 내용을 전송한다!
        userId: this.$store.state.user.user.userId, // 유저아이디 전송!
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';

  .content-wrap {
    width: 100%;
    height: calc(100vh - 70px);
    background: white;
  }

  .active:hover{
    color: white;
    background-color: #0084ff;
    font-size: 18px;
  }
  /*.tab-design{*/
    /*width: 100px;*/
  /*}*/

  .design-box{
    height: 80px;
    margin: 8px;
    border-radius: 12px;
    border: none;
    outline: 0;
    width: 80px;
    font-size: 14px;
    color: #f0f0f0;
    background-color: #7cbdf8;
    /*cursor: auto;*/
    /*box-shadow: 5px 5px 5px #a8a4a4;*/
  }

</style>

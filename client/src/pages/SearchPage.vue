<template>
  <div class="flex-container flex-center-sort">
    <toolbar :title="'검색'" />
    <div>
      <div class="flex-center-sort ">
        <br /><br />
        <a-input-search
          placeholder="input search text"
          enterButton
          @input="searchWordChecker"
          v-model="searchData"></a-input-search>
   
        <br /><br />
      </div>
      <div>
        <div>
          <header :style="{
                          zIndex: 100,
                       }">
            <div class="flex-between-sort flex-row tab-design" defaultActiveKey="1" >
              <router-link :to="{ name: 'LocalSearchTab' }"
                           tag="button" key="1"
                           active-class= "active"
                           class="design-box" >{{ tab.pane1 }}</router-link>
              <router-link :to="{ name: 'ReporterSearchTab' }"
                           tag="button" key="2"
                           active-class= "active"
                           class="design-box">{{ tab.pane2 }}</router-link>
              <router-link :to="{ name: 'PostSearchTab' }"
                           tag="button" key="3"
                           active-class= "active"
                           class="design-box" >{{ tab.pane3 }}</router-link>
            </div>
          </header>
          <!---->
          <!--<header>-->
            <!--<a-tabs defaultActiveKey="1">-->
              <!--<a-tab-pane tab="Tab 1" key="1"> {{ tab.pane1}} </a-tab-pane>-->
              <!--<a-tab-pane tab="Tab 2" key="2"> {{ tab.pane2}} </a-tab-pane>-->
              <!--<a-tab-pane tab="Tab 3" key="3"> {{ tab.pane3}} </a-tab-pane>-->
            <!--</a-tabs>-->
          <!--</header>-->
          <!---->
          <a-layout-content class="content-wrap">
            <router-view></router-view>
          </a-layout-content>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ALayoutSider from "ant-design-vue/es/layout/Sider";
const Toolbar = () => import('@/components/Toolbar');
import _ from 'lodash';

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
      userId: this.$store.state.user.user.userId,

    };
  },
  // created () {
  //   LocalSearchTab[0].click();
  // },
  methods: {
    // async onSearch() {
    //   await this.$store.dispatch('search/searchProcess', {
    //     searchContent: this.searchData, // 검색창에 입력받은 내용을 전송한다!
    //     userId: this.$store.state.user.user.userId, // 유저아이디 전송!
    //   });
    // },
    
    searchWordChecker: _.debounce(
      async function () {
        const searchWord = this.searchData;
        const trimWord = searchWord.trim();
        await this.$store.dispatch('search/loadLocalData', {
          word: trimWord,
        });
        await this.$store.dispatch('search/loadUserData', {
          word: trimWord,
        });
        await this.$store.dispatch('search/loadSearchPost', {
          word: trimWord,
        });
      }, 500,
    ),
  },
};
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';

  .content-wrap {
    width: 290px;
    height: calc(100vh - 70px);
    background: white;
  }

  .active:hover {
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
    font-size: 18px;
    color: #f0f0f0;
    background-color: #7cbdf8;
    cursor: pointer;
    /*box-shadow: 5px 5px 5px #a8a4a4;*/
  }

</style>

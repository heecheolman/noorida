<template>
  <div class="flex-container flex-center-sort">
    <toolbar :title="'검색'" />
    <div>
      <div class="flex-center-sort ">
        <br /><br /><br />
        <a-input-search
          placeholder="input search text"
          enterButton
          @input="searchWordChecker"
          v-model="searchData"></a-input-search>
        <br /><br />
      </div>
      <div>
        <div>
          <header class="div-center">
            <div class="box-size">
              <a-tabs defaultActiveKey="1" @change="callback">
                <a-tab-pane tab="지역" key="1"></a-tab-pane>
                <a-tab-pane tab="리포터" key="2"></a-tab-pane>
                <a-tab-pane tab="게시글" key="3"></a-tab-pane>
              </a-tabs>
            </div>
          </header>
          <a-layout-content class="content-wrap">
            <router-view></router-view>
          </a-layout-content>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Toolbar = () => import('@/components/Toolbar');
import _ from 'lodash';

export default {
  name: 'SearchPage',
  components: {
    Toolbar,
  },
  data() {
    return {
      searchData: '',
      userId: this.$store.state.user.user.userId,
    };
  },
  async created() {
    this.$router.replace({ name: 'LocalSearchTab' });
    const initData = '';
    await this.$store.dispatch('search/loadLocalData', {
      word: initData,
    });
    await this.$store.dispatch('search/loadUserData', {
      word: initData,
    });
    await this.$store.dispatch('search/loadSearchPost', {
      word: initData,
    });
  },
  methods: {
    callback(key) {
      switch (key) {
        case '1': this.$router.replace({ name: 'LocalSearchTab' }); break;
        case '2': this.$router.replace({ name: 'ReporterSearchTab' }); break;
        case '3': this.$router.replace({ name: 'PostSearchTab' }); break;
      }
    },

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
  .box-size{
    width: 275px;
  }
  .div-center{
    text-align: center;
  }
</style>

<template>
  <div>
    <a-list>
      <!--<a-list :loading="loading">-->
      <div class="padding--10">
        <a-list-item v-for="item in hotList"
                     :key="item.contentId" class="box-size"
                     @click="routeDetailPage(item.contentId)">

          <a-list-item-meta>

            <span slot="avatar" class="design-card text-center design-rank">{{item.rank}}</span>
            <a slot="title" class="title">{{ item.title }}</a>
            <a-avatar class="avatar-line" v-if="item.avatar" slot="avatar" :src="`http://localhost:3000/images/${item.avatar}`"/>
            <a-avatar v-else slot="avatar" icon="user"></a-avatar>
            <div slot="description" class="description">
              <div class="description-row" style="justify-content: space-between">
                {{ item.nickName }}
                <span class="timeline"> {{ item.createdAt | timeline }}</span>
              </div>
              <div class="description-row" style="justify-content: space-between">
                {{ item.localName }}
                <span class="view">
                     <a-icon theme="filled" type="eye" style="margin-right: 2px;"/>{{ item.view }}
                    </span>
              </div>
            </div>

          </a-list-item-meta>
        </a-list-item>
      </div>
    </a-list>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  // import infiniteScroll from 'vue-infinite-scroll';
  const VirtualList = () => import('@/components/VirtualList');
  import api from '@/api/ApiService';

  export default {
    name: 'HotNewsTab',
    // directives: { infiniteScroll },
    components: {
      VirtualList,
      api,
    },
    data() {
      return {

      };
    },
    async created() {
      /////////////// localId를 임의적으로 그냥 넣어줬어요!!!!ㅠㅠㅠㅠㅠ
      const localId = '1';
      await this.$store.dispatch('hot/hotTopicProcess', {
        localId : localId,
      });

    },
    computed: {
      ...mapState('hot',[
        'hotList',
      ]),
    },
    methods: {
      routeDetailPage(contentId) {
        if (contentId) {
          this.$router.push({
            name: 'PostDetailPage',
            params: { contentId },
          });
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .design-card{
    float: left;
    margin: 20px;
    font-size: 20px;
  }
  .design-rank{


  }
  /*.scroller {*/
  /*!* 120px = header + footer *!*/
  /*height: calc(100vh - 120px);*/
  /*}*/

  .ant-list-item {
    padding: 12px 10px;
    font-size: 10px;
    .ant-list-item-meta {
      .ant-list-item-meta-content {
        .ant-list-item-meta-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: break-all;
          width: 55vw;

          .title {
            color: #222;
          }
        }
        .ant-list-item-meta-description {
          line-height: 22px;

          .description {
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 100%;

            &-row {
              width: 100%;
              height: auto;
              display: flex;
              align-items: center;
              font-size: 10px;

              .view {
                display: flex;
                align-items: center;
                height: 17px;
                /*border-radius: 15px;*/
                /*background-color: #fff;*/
                /*border: 1px solid rgba(215, 215, 215, 0.4);*/
                /*color: powderblue;*/

              }
              .timeline {
                /*color: pink;*/
              }

            }
          }
        }
      }

      .ant-list-item-content {
        /*.timeline {*/
        /*//@include font-size-small;*/
        /*color: pink;*/
        /*}*/
      }
    }
  }
</style>

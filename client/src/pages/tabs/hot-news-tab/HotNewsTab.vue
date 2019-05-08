<template>
  <div class="hot-wrap">
    <a-list>
      <div class="padding--10">
        <a-list-item v-for="item in hotList"
                     :key="item.contentId" class="box-size"
                     @click="routeDetailPage(item.contentId)">

          <a-list-item-meta>
            <span slot="avatar" class="design-card text-center design-rank">{{item.rank}}</span>
            <a slot="title" class="title">{{ item.title }}</a>
            <a-avatar  class="avatar-line" v-if="item.avatar" slot="avatar" :src="`/images/${item.avatar}`"/>
            <a-avatar class="avatar-line" v-else slot="avatar" icon="user"></a-avatar>
            <div slot="description" class="description">
              <div class="description-row" style="justify-content: space-between">
                {{ item.nickName }}
                <span class="timeline"> {{ item.createdAt | timeline }}</span>
              </div>
              <div class="description-row" style="justify-content: space-between">
                {{ item.localName }}
                <span class="view">
                     <a-icon theme="filled" type="eye" style="margin-right: 2px;"/>{{ item.views }}
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

export default {
  name: 'HotNewsTab',
  components: {
  },
  data() {
    return {

    };
  },
  async created() {
    const localName = this.$store.state.user.location.address;
    await this.$store.dispatch('hot/hotTopicProcess', { localName });
  },
  computed: {
    ...mapState('hot', [
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

.avatar-line{
  margin-top: 25px;
  margin-left: -7px;
}
  .hot-wrap {
    width: 100%;
    height: calc(100vh - 110px);
    overflow-y: scroll;


    .design-card{
      float: left;
      margin: 20px;
      font-size: 18px;
    }
    .design-rank{
      margin-top: 28px;
      margin-left: 1px;
    }


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
            height: 20px;
            margin-top: 10px;

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
                }
                .timeline {
                }

              }
            }
          }
        }

        .ant-list-item-content {

        }
      }
    }
  }
</style>

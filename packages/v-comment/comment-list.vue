<template>
  <div class="comment-list">
    <van-pull-refresh v-model="refreshLoading" @refresh="refresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :offset="10" @load="load">
        <van-skeleton
          title
          avatar
          row="2"
          :animate="true"
          avatar-size="45px"
          :loading="firstLoading"
        >
          <div class="comment-item" v-for="(item, index) in list" :key="index">
            <div class="user-icon">
              <van-image v-if="!$slots.icon" width="40" height="40" round :src="item.icon" />
              <slot name="icon"></slot>
            </div>
            <div class="comment-body">
              <div v-if="!$slots.body">
                <h5 class="nickname">{{ item.nickname }}</h5>
                <div class="comment-content">{{ item.content}}</div>
                <div class="comment-foot">
                  <van-icon class="time-icon" name="underway-o" />
                  <span class="comment-time">{{item.time}}</span>
                </div>
              </div>
              <slot name="body"></slot>
            </div>
          </div>
        </van-skeleton>
        <van-skeleton
          title
          avatar
          row="2"
          :animate="true"
          avatar-size="45px"
          :loading="loading"
        ></van-skeleton>
        <van-skeleton
          title
          avatar
          row="2"
          :animate="true"
          avatar-size="45px"
          :loading="loading"
        ></van-skeleton>
        <van-skeleton
          title
          avatar
          row="2"
          :animate="true"
          avatar-size="45px"
          :loading="loading"
        ></van-skeleton>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { Skeleton, Icon, List, Image, PullRefresh } from "vant";
export default {
  name: "CommentList",
  data() {
    return {
      loading: true,
      refreshLoading: false,
      finished: false,
      firstLoading: true
    };
  },
  props: {
    list: {
      type: Array
      // default: function () {
      //   return [];
      // }
    }
  },
  methods: {
    refresh() {
      this.firstLoading = false;
      this.$emit("refresh", () => {
        this.refreshLoading = false;
      }, () => {
        this.finished = true;
      });
    },
    load() {
      this.$emit("load", () => {
        this.firstLoading = false;
        this.loading = false;
      }, () => {
        this.finished = true;
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    });
  },
  components: {
    VanSkeleton: Skeleton,
    VanList: List,
    VanImage: Image,
    VanIcon: Icon,
    VanPullRefresh: PullRefresh
  }
};
</script>
<style  lang="less" scoped>
.bd (@color:red, @px:1px) {
  border: @px solid @color;
}
.table-cell-center {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
@input-radius: 10px;
@color-main-input-background: #f8f8f8;
@input-radius: 10px;

.comment-list {
  .comment-item {
    display: table;
    border-bottom: 1px solid @color-main-input-background;

    .user-icon {
      width: 40px;
      display: table-cell;
      // .bd();
    }

    .comment-body {
      display: table-cell;
      vertical-align: top;
      padding: 5px;
      // .bd();
      width: 100%;

      .nickname {
        // .bd();
        text-align: left;
        margin: 0;
        padding: 0 0 2px 0;
        font-size: 14px;
        font-weight: bolder;
      }

      .comment-content {
        // .bd();
        position: relative;
        padding: 5px;
        background: @color-main-input-background;
        border-radius: @input-radius;
      }

      .comment-foot {
        // .bd();
        padding: 2px;
        font-size: 12px;
        .time-icon {
          font-size: 16px;
          .table-cell-center();
        }
        .comment-time {
          padding-left: 2px;
          margin-left: 2px;
          font-size: 12px;
          // .bd();
          .table-cell-center();
        }
      }
    }
  }
}
</style>


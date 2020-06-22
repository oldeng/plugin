<template>
  <div class="home">
    <div class="comment">
      <component
        :is="componentId"
        :list="list"
        @submit="submit"
        @refresh="refresh"
        @load="load"
        @open-comment="openComment"
      ></component>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VComment from "../../packages/v-comment/index.vue";
import VCommentList from "../../packages/v-comment/comment-list";
import { Toast } from "vant";
import axios from "axios";
import { throttle } from "lodash";
export default {
  name: "Home",
  data() {
    return {
      componentId: "VComment",
      pageNum: 1,
      pageSize: 1,
      list: []
    };
  },
  methods: {
    submit(content) {
      Toast.success("保存成功");
      setTimeout(() => {
        Toast.success(content);
      }, 2000);
    },
    openComment() {
      Toast.success("打开评论列表");
      this.componentId = "VCommentList";
    },
    getData: throttle(function (done, finish) {
      debugger;
      console.log(this);
      axios
        .get("http://localhost:8000/commentList", {
          params: {
            pageNum: this.pageNum++,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          console.log(this.list);
          this.list = this.list.concat(res.data.data.list);
          done();
          if (this.list.length >= res.data.data.total) {
            finish();
          }
        });
    }, 1000),
    refresh(done, finish) {
      this.getData(done, finish);
    },
    load(done, finish) {
      this.getData(done, finish);
    }
  },
  mounted() {},
  components: {
    VComment,
    VCommentList
  }
};
</script>
<style lang="less" scoped>
h1 {
  margin: 0;
}
.comment {
  width: 375px;
  height: 812px;
  margin: 0 auto;
  overflow: auto;

  /deep/ .comment-content {
    color: rgba(30, 30, 30);
  }
}
</style>
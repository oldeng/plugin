<template>
  <div class="v-comment">
    <div class="content">
      <div v-if="$slots.utils" class="utils">
          <slot name="utils"></slot>
      </div>
      <div class="input-wraper">
        <van-field v-if="!$slots.content" v-model="content" rows="2" type="message" placeholder="请输入评论"></van-field>
        <slot name="content"></slot>
      </div>
      <div class="button-wraper">
        <div v-if="!$slots.btns" class="comment-btns">
          <van-button roundtype="danger" color="#FFE223" @click="submit" >{{Button}}</van-button>
          <van-icon name="chat-o" :badge="badge" @click="openComments"></van-icon>
        </div>
        <slot name="btns"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { Field, Button, Icon } from 'vant';

export default {
  name: "Comment",
  data() {
    return {
      content: "",
    };
  },
  props: {
      Button: {
          type: String,
          default: '评论'
      },
      badge: {
          type: [String, Number],
          default: 0
      }
  },
  methods: {
    submit () {
        this.$emit('submit', this.content);
    },
    //打开评论列表事件
    openComments () {
        this.$emit('open-comment');
    }
  },
  components: {
     VanField: Field, 
     VanButton: Button, 
     VanIcon: Icon
  }
};
</script>
<style lang="less" scoped>
@color-mian-dim: #CCCCCC;
@font-dark-color: #333333;
.bd (@color:red, @px:1px) {
    border: @px solid @color;
}
.v-comment {
  padding: 2px;
  .content {
    width: 100%;
    border-top: @color-mian-dim 1px solid;
    display: table;

    .utils {
        display: table-cell;
        vertical-align: middle;
    }

    .input-wraper {
      display: table-cell;
      text-align: center;
      vertical-align: middle;

      /deep/ .van-cell {
        // height: 20px;
        padding: 5px;
      }
      /deep/ .van-field__control {
        border: 1px solid @color-mian-dim;
        border-radius: 5px;
        // background: @color-mian-dim;
        text-indent: 5px;
        height: 38px;
        padding: 0;
      }
    }

    .button-wraper {
      padding: 2px 2px 2px 0px;
      display: table-cell;
      text-align: center;
      vertical-align: middle;

      /deep/ .van-button__text {
        color: @font-dark-color;
        .van-radio__label {
          width: 30px;
        }
      }

      .comment-btns {
        display: flex;
        // .bd();
        justify-content: space-around;
      }

      /deep/ .van-button {
        border-radius: 5px;
        display: flex;

        .van-button__text {
          width: 30px;
        }
      }

      /deep/ .van-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 15px 5px 15px;
        margin-left: 5px;
        background: rgb(255, 226, 35);
        border-radius: 5px;
        color: #333333;

        .van-info {
          top: 10px;
          right: 10px;
        }
      }

      /deep/ .van-icon::before {
        font-size: 30px;
      }
    }
  }
}
</style>
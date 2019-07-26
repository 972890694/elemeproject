<template>
  <div class="ratings" ref="rating">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{ seller.foodScore }}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.score"></star>
            <div class="score">{{ seller.foodScore }}</div>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.score"></star>
            <div class="score">{{ seller.foodScore }}</div>
          </div>
          <div class="delivery-wrapper">
            <div class="title">送达时间</div>
            <div class="delivery">{{ seller.deliveryTime }}分钟</div>
          </div>
        </div>
      </div>
      <split></split>
      <div class="zujian">
        <ratingselect
          :ratings="ratings"
          :select-type="selectType"
          :only-content="onlyContent"
          @changeType="changeType"
          @changeOnly="contentOnly"
        ></ratingselect>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li
            class="rating-item"
            v-for="(rating,i) in ratings"
            :key="i"
            v-show="needShow(rating.rateType,rating.text)"
          >
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28" />
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery">{{ rating.deliveryTime }}</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend">
                <span class="glyphicon glyphicon-thumbs-up" v-show="rating.rateType===0"></span>
                <span class="item" v-for="(item,i) in rating.recommend" :key="i">{{ item }}</span>
              </div>
              <div class="time">{{ rating.rateTime || formatTime }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from "../star/star";
import split from "../split/split";
import ratingselect from "../ratingselect/ratingselect";
import BScroll from "better-scroll";

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props: ["seller"],
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: false
    };
  },
  methods: {
    changeType(type) {
      this.selectType = type;
    },
    contentOnly(content) {
      this.onlyContent = content;
    },
    needShow(type, text) {
      // 如果没有内容并且(只看内容)按钮也不是选中状态 则返回 false
      if (!text && this.onlyContent) {
        return false;
      }
      //   如果有内容 则看 上面三个 选中的是 全部 还是 好评 或者是 差评 在根据条件渲染结果
      if (this.selectType == ALL) {
        return true;
        // 否则 返回 和上面差评好评状态响应的评论
      } else {
        return type == this.selectType;
      }
    }
  },
  created() {
    this.$axios.get(`/ratings`).then(v => {
      this.ratings = v.data.data;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.rating, {
            click: true
          });
        }
      });
    });
  },
  components: {
    star,
    split,
    ratingselect
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/style/style.less";
.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    padding: 18px 0;
    .overview-left {
      flex: 0 0 137px;
      width: 137px;
      text-align: center;
      border-right: 1px solid #d9dde1;
      .score {
        color: #fc9153;
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 6px;
      }
      .title {
        color: #333;
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 8px;
      }
      .rank {
        color: #999;
        font-size: 10px;
        line-height: 10px;
      }
    }
    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;
      .score-wrapper {
        display: flex;
        margin-bottom: 8px;
        text-align: center;
        align-items: center;
        .title {
          color: #333;
          font-size: 12px;
          line-height: 18px;
        }
        .star {
          margin: 0 12px;
        }
        .score {
          color: #fc9153;
          font-size: 12px;
          line-height: 18px;
        }
      }
      .delivery-wrapper {
        display: flex;
        text-align: center;
        align-items: center;
        font-size: 12px;
        .title {
          color: #333;
          line-height: 18px;
        }
        .delivery {
          color: #999;
          margin-left: 12px;
        }
      }
    }
  }
  .zujian {
    padding: 18px 18px 0;
  }
  .rating-wrapper {
    .rating-item {
      display: flex;
      padding: 18px;
      .border-top(rgba(7, 17, 27, 0.1));
      .avatar {
        flex: 0 0 28px;
        img {
          border-radius: 50%;
        }
      }
      .content {
        position: relative;
        flex: 1;
        margin-left: 12px;
        .name {
          color: #333;
          font-size: 10px;
          line-height: 12px;
          margin-bottom: 4px;
        }
        .star-wrapper {
          display: flex;
          align-items: center;
          margin-bottom: 6px;
          .delivery {
            color: #999;
            font-size: 10px;
            vertical-align: center;
            margin-left: 6px;
          }
        }
        .text {
          color: #333;
          font-size: 12px;
          line-height: 18px;
          margin-bottom: 8px;
        }
        .recommend {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          line-height: 16px;
          .glyphicon-thumbs-up {
            font-size: 10px;
            margin: 0 8px 4px 0;
            color: #00a0dc;
          }
          .item {
            background: #fff;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: #999;
            padding: 0 6px;
            font-size: 10px;
            margin: 0 8px 4px 0;
          }
        }
        .time {
          color: #999;
          font-size: 12px;
          line-height: 12px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
  }
}
</style>

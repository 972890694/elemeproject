<template>
  <div class="ratings">
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
          <ratingselect></ratingselect>
      </div>
    </div>
  </div>
</template>

<script>
import star from "../star/star";
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect'
export default {
  props: ["seller"],
  data() {
    return {};
  },
  created() {
      
  },
  components: {
    star,
    split,
    ratingselect
  }
};
</script>

<style lang="less" scoped>
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
        padding: 18px;
    }
}
</style>

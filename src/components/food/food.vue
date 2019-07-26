<template>
  <transition name="food">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="imageHeader">
          <div class="picture" :style="{'background-image': 'url(' + food.image + ')' }"></div>
          <div class="back" @click="showFlag=false">
            <i class="glyphicon glyphicon-chevron-left"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{ food.name }}</h1>
          <div class="detail">
            <span class="sell-count">月售{{ food.sellCount }}份</span>
            <span class="rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{ food.price }}</span>
            <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
          </div>
          <div class="cartControl-wrapper">
            <cartcontrol :food="food" v-show="food.count>0"></cartcontrol>
          </div>
          <div class="buy" v-show="!food.count || food.count==0" @click="addFirst">加入购物车</div>
        </div>
        <split></split>
        <div class="info">
          <h1 class="title" v-show="food.info !=''">商品介绍</h1>
          <div class="text">{{ food.info }}</div>
        </div>
        <split v-show="food.info"></split>
        <div class="rating">
          <h1 class="title">商评评价</h1>
          <ratingselect
            :select-type="selectType"
            :only-content="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
            @changeType="changeType"
            @changeOnly="contentOnly"
          ></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li
                v-show="needShow(rating.rateType,rating.text)"
                v-for="(rating,i) in food.ratings"
                :key="i"
                class="rating-item"
              >
                <div class="user">
                  <span class="name">{{ rating.username }}</span>
                  <img :src="rating.avatar" class="avatar" width="12" height="12" />
                </div>
                <div class="time">{{ rating.rateTime | formatTime }}</div>
                <p class="text">
                  <span
                    :class="{'glyphicon glyphicon-thumbs-up': rating.rateType===0, 'glyphicon glyphicon-thumbs-down': rating.rateType===1}"
                  ></span>
                  {{ rating.text }}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价内容</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol";
import split from "../split/split";
import ratingselect from "../ratingselect/ratingselect";

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    addFirst() {
      this.$set(this.food, "count", 1);
      // Vue.set(this.food,'count',1)
    },
    needShow(type, text) {
      if(this.onlyContent && !text) {
        return false;
      }
      if(this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    changeType(type) {
      
      this.selectType = type;
    },
    contentOnly(content) {
      
      this.onlyContent = content;
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/style/style.less";
.food {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  bottom: 48px;
  width: 100%;
  background: #fff;
  .imageHeader {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    .picture {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .back {
      position: absolute;
      top: 10px;
      left: 0;
      .glyphicon-chevron-left {
        font-size: 20px;
        color: #fff;
        padding: 10px;
        display: block;
      }
    }
  }
  .content {
    position: relative;
    padding: 18px;
    .title {
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
      line-height: 14px;
      margin-bottom: 8px;
    }
    .detail {
      font-size: 12px;
      color: rgb(147, 153, 159);
      line-height: 10px;
      margin-bottom: 18px;
      .sell-count {
        margin-right: 12px;
      }
    }
    .price {
      line-height: 24px;
      .now {
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);
        padding: 18px 0;
      }
      .old {
        font-size: 12px;
        font-weight: normal;
        color: rgb(147, 153, 159);
        text-decoration: line-through;
      }
    }
    .cartControl-wrapper {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 10px;
      color: #fff;
      background: rgb(0, 160, 220);
    }
  }
  .info {
    padding: 18px;
    .title {
      color: #333;
      font-size: 14px;
      line-height: 14px;
      margin-bottom: 6px;
    }
    .text {
      color: #666;
      font-size: 12px;
      line-height: 24px;
      padding: 0 8px;
    }
  }
  .rating {
    padding: 18px;
    .title {
      color: #333;
      font-size: 14px;
      line-height: 14px;
      margin-bottom: 18px;
    }
    .rating-wrapper {
      .rating-item {
        padding: 16px 0;
        .border-top(rgba(7, 17, 27, 0.1));
        .user {
          float: right;
          .name {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 24px;
          }
          .avatar {
            border-radius: 50%;
            margin-left: 6px;
          }
        }
        .time {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 12px;
        }
        .text {
          font-size: 12px;
          line-height: 16px;
          color: rgb(7, 17, 27);
          .glyphicon-thumbs-up,
          .glyphicon-thumbs-down {
            line-height: 24px;
            padding-right: 4px;
            color: rgb(0, 160, 220);
          }
          .glyphicon-thumbs-down {
            color: rgb(147, 153, 159);
          }
        }
      }
      .no-rating {
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147,153,159);
      }
    }
  }
}

.food-enter {
  transform: translateY(-100%);
}

.food-leave-to {
  transform: translateY(100%);
}

.food-enter-active,
.food-leave-active {
  transition: all 0.2s linear;
}
</style>


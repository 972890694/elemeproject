<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{ seller.name }}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{ seller.ratingCount }})</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <span class="glyphicon glyphicon-heart" :class="{'active': favorite}" @click="collect"></span>
          <span class="text">{{ favoriteText }}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{ seller.bulletin }}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="supports-item" v-for="(v,i) in seller.supports" :key="i">
            <span class="icon" :class="classMap[v.type]"></span>
            <span class="text">{{ v.description }}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <div class="pic-wrapper" ref="picScroll">
          <ul class="pic-list" ref="ulWidth">
            <li class="pic-item" v-for=" (pic,i) in seller.pics" :key="i">
              <img :src="pic" width="120" height="90" />
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info,i) in seller.infos" :key="i">{{ info }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from "../star/star";
import split from "../split/split";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      favorite: false
    };
  },
  methods: {
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.ulWidth.style.width = width + "px";
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picScroll, {
              scrollX: true,
              click: true
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    },
    collect() {
      this.favorite = !this.favorite;
    }
  },
  mounted() {
    this.sellerScroll = new BScroll(this.$refs.seller, { click: true });
    this._initPics();
  },
  props: ["seller"],
  components: {
    star,
    split
  },
  computed: {
    favoriteText() {
        return this.favorite === true? '已收藏' : '收藏'
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
  },
  watch: {
    "seller.pics"() {
      this._initPics();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/style/style.less";
.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    padding: 18px;
    .title {
      font-size: 14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
      margin-bottom: 8px;
    }
    .desc {
      display: flex;
      padding-bottom: 18px;
      .star {
        margin-right: -4px;
      }
      .text {
        font-size: 10px;
        color: rgb(77, 85, 93);
        line-height: 18px;
        margin-left: 12px;
      }
    }
    .remark {
      .border-top(rgba(7, 17, 27, 0.1));
      display: flex;
      padding-top: 18px;
      .block {
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        flex: 1;
        text-align: center;
        &:last-child {
          border: none;
        }
        .title {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
          margin-bottom: 4px;
        }
        .content {
          font-size: 10px;
          font-weight: 200;
          color: rgb(7, 17, 27);
          line-height: 24px;
          .stress {
            font-size: 24px;
          }
        }
      }
    }
    .favorite {
      position: absolute;
      right: 11px;
      text-align: center;
      top: 18px;
      width: 50px;
      .glyphicon-heart {
        color: #ccc;
        display: block;
        font-size: 24px;
        line-height: 24px;
        margin-bottom: 4px;
        &.active {
          color: rgb(240, 20, 20);
        }
      }
      .text {
        color: #666;
        font-size: 10px;
        line-height: 10px;
      }
    }
  }
  .bulletin {
    padding: 18px 18px 0;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .content-wrapper {
      padding: 0 12px 16px;
      .content {
        font-size: 12px;
        font-weight: 200;
        color: rgb(240, 20, 20);
        line-height: 24px;
      }
    }
    .supports {
      .supports-item {
        .border-top(rgba(7, 17, 27, 0.1));
        padding: 16px 12px;
        font-size: 0;
        &:last-child {
          margin-bottom: 0;
        }
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: top;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease {
            background-image: url("../../assets/images/decrease_4@2x.png");
            @media (-webkit-min-device-pixel-ratio: 3),
              (min-device-pixel-ratio: 3) {
              background-image: url("../../assets/images/decrease_4@3x.png");
            }
          }
          &.discount {
            background-image: url("../../assets/images/discount_4@2x.png");
            @media (-webkit-min-device-pixel-ratio: 3),
              (min-device-pixel-ratio: 3) {
              background-image: url("../../assets/images/discount_1@3x.png");
            }
          }
          &.guarantee {
            background-image: url("../../assets/images/guarantee_4@2x.png");
            @media (-webkit-min-device-pixel-ratio: 3),
              (min-device-pixel-ratio: 3) {
              background-image: url("../../assets/images/guarantee_4@3x.png");
            }
          }
          &.invoice {
            background-image: url("../../assets/images/invoice_4@2x.png");
            @media (-webkit-min-device-pixel-ratio: 3),
              (min-device-pixel-ratio: 3) {
              background-image: url("../../assets/images/invoice_4@3x.png");
            }
          }
          &.special {
            background-image: url("../../assets/images/special_4@2x.png");
            @media (-webkit-min-device-pixel-ratio: 3),
              (min-device-pixel-ratio: 3) {
              background-image: url("../../assets/images/special_4@3x.png");
            }
          }
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          font-weight: 200;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
  .pics {
    padding: 18px;
    .title {
      font-size: 14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
      margin-bottom: 12px;
    }
    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list {
        font-size: 0;
        .pic-item {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .info {
    padding: 18px;
    .title {
      font-size: 14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
      margin-bottom: 12px;
    }
    .info-item {
      .border-top(rgba(7, 17, 27, 0.1));
      padding: 16px 12px;
      font-size: 12px;
      font-weight: 200;
      color: rgb(7, 17, 27);
      line-height: 16px;
    }
  }
}
</style>

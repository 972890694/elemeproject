<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count" @click="detailShow=true">{{ seller.supports.length }}个</span>
        <i class="glyphicon glyphicon-menu-right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="detailShow=true">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="glyphicon glyphicon-menu-right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
    <!-- 动画 -->
    <transition name="mask">
      <div v-if="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{ seller.name }}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="supports-item" v-for="(v,i) in seller.supports" :key="i">
              <span class="icon" :class="classMap[v.type]"></span>
              <span class="text">{{ v.description }}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{ seller.bulletin }}</p>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="glyphicon glyphicon-triangle-bottom" @click="detailShow=false"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star'
export default {
  data () {
    return {
      classMap: [],
      detailShow: false
    }
  },
  methods: {},
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  props: ['seller'],
  components: {
    star
  }
}
</script>

<style lang='less' scoped>
.header {
  position: relative;
  overflow: hidden;
  color: #fff;
  background-color: rgba(7, 17, 27, 0.5);
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          background-image: url("../../assets/images/brand@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
            background-image: url("../../assets/images/brand@2x.png");
          }
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .support {
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            background-image: url("../../assets/images/decrease_1@2x.png");
            @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
              background-image: url("../../assets/images/decrease_1@3x.png");
            }
          }
          &.discount {
            background-image: url("../../assets/images/discount_1@2x.png");
            @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
              background-image: url("../../assets/images/discount_1@3x.png");
            }
          }
          &.guarantee {
            background-image: url("../../assets/images/guarantee_1@2x.png");
            @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
              background-image: url("../../assets/images/guarantee_1@3x.png");
            }
          }
          &.invoice {
            background-image: url("../../assets/images/invoice_1@2x.png");
            @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
               background-image: url("../../assets/images/invoice_1@3x.png");
            }
          }
          &.special {
            background-image: url("../../assets/images/special_1@2x.png");
            @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
              background-image: url("../../assets/images/special_1@3x.png");
            }
          }
        }
        .text {
          line-height: 12px;
          font-size: 12px;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 18px;
      padding: 0 10px 0 18px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count {
        vertical-align: top;
        font-size: 10px;
      }
      .glyphicon-menu-right {
        font-size: 10px;
        font-weight: 100;
        margin-top: 5px;
        margin-left: 4px;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: rgba(7, 17, 27, 0.2);
    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      background-size: 22px 12px;
      background-repeat: no-repeat;
      background-image: url("../../assets/images/bulletin@2x.png");
      @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
        background-image: url("../../assets/images/bulletin@3x.png");
      }
    }
    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }
    .glyphicon-menu-right {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 8px;
    }
  }
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(10px);
  }
  .detail {
    position: fixed;
    background-color: rgba(7, 17, 27, 0.9);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0 36px;
    z-index: 100;
    overflow: auto;
    backdrop-filter: blur(10px);
    .detail-wrapper {
      min-height: 100%;
      .detail-main {
        position: relative;
        margin-top: 64px;
        padding-bottom: 64px;
        .name {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          line-height: 16px;
          text-align: center;
        }
        .star-wrapper {
          text-align: center;
          margin: 18px;
          padding: 2px 0;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px;
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255,255,255,.2);
          }
          .text {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
            line-height: 14px;
          }
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          .supports-item {
            padding: 0 12px;
            margin-bottom: 12px;
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
              background-image: url("../../assets/images/decrease_1@2x.png");
              @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
                background-image: url("../../assets/images/decrease_1@3x.png");
                }
              }
              &.discount {
                background-image: url("../../assets/images/discount_1@2x.png");
                @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
                  background-image: url("../../assets/images/discount_1@3x.png");
                }
              }
              &.guarantee {
                background-image: url("../../assets/images/guarantee_1@2x.png");
                @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
                  background-image: url("../../assets/images/guarantee_1@3x.png");
                }
              }
              &.invoice {
                background-image: url("../../assets/images/invoice_1@2x.png");
                @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
                   background-image: url("../../assets/images/invoice_1@3x.png");
                }
              }
              &.special {
                background-image: url("../../assets/images/special_1@2x.png");
                @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
                  background-image: url("../../assets/images/special_1@3x.png");
                }
              }
            }
            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: 0 auto;
          .content {
            font-style: 12px;
            font-weight: 200;
            line-height: 24px;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0;
      clear: both;
      font-size: 32px;
    }
  }
}

.mask-enter,
.mask-leave-to {
  opacity: 0;
  transform: translateY(100%)
}

.mask-enter-active,
.mask-leave-active {
  transition: all .4s ease
}
</style>

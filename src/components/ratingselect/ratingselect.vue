<template>
  <div class="rating-select">
    <div class="rating-type">
      <span class="block positive" @click="select(2)" :class="{ 'active': typeSelect===2 }">
        {{ desc.all }}
        <span class="count" v-if="ratings">{{ ratings.length }}</span>
      </span>
      <span class="block positive" @click="select(0)" :class="{ 'active': typeSelect===0 }">
        {{ desc.positive }}
        <span class="count">{{ positives.length }}</span>
      </span>
      <span class="block negative" @click="select(1)" :class="{ 'active': typeSelect===1 }">
        {{ desc.negative }}
        <span class="count">{{ negatives.length }}</span>
      </span>
    </div>
    <div class="switch">
      <div class="circle" @click="toogleContent" :class="{ 'on': contentOnly }">
        <i class="glyphicon glyphicon-ok" :class="{ 'on': contentOnly }"></i>
      </div>
      <div class="text">只看内容评价</div>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  data() {
    return {
      typeSelect: this.selectType,
      contentOnly: this.onlyContent
    };
  },
  methods: {
    select(type) {
      this.typeSelect = type;
      this.$emit("changeType", this.typeSelect);
    },
    toogleContent() {
      this.contentOnly = !this.contentOnly;
      this.$emit("changeOnly", this.contentOnly);
    }
  },
  computed: {
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType == POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter(rating => {
        return rating.rateType == NEGATIVE;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/style/style.less";
.rating-select {
  .rating-type {
    // .border-px(rgba(7, 17, 27,.1));
    .border-px(red);
    padding-bottom: 18px;
    .block {
      border-radius: 1px;
      color: #666;
      display: inline-block;
      font-size: 12px;
      line-height: 16px;
      margin-right: 8px;
      padding: 8px 12px;
      &.active {
        color: #fff;
      }
      &.positive {
        background: rgba(0, 160, 220, 0.2);
        &.active {
          background: #00a0dc;
        }
      }
      &.negative {
        background: #ccc;
        &.active {
          background: #666;
        }
      }
    }
  }
  .switch {
    padding: 12px 0;
    .circle {
      float: left;
      margin-right: 8px;
      width: 20px;
      height: 20px;
      background: #b7bbbf;
      border-radius: 50%;
      text-align: center;
      &.on {
        background-color: #00b43c;
      }
      .glyphicon-ok {
        font-size: 15px;
        color: rgb(147, 153, 159);
        line-height: 19px;
        font-weight: 100;
        &.on {
          color: #fff;
        }
      }
    }
    .text {
      font-size: 12px;
      line-height: 22px;
      color: rgb(147, 153, 159);
    }
  }
}
</style>


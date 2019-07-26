<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          v-for="(v,i) in goods"
          :key="i"
          class="menu-item"
          :class="{'current':currentIndex === i}"
          @click="selectMenu(i)"
        >
          <!-- <li v-for="(v,i) in goods" :key="i" class="menu-item"> -->
          <span class="text">
            <span v-show="v.type>0" :class="classMap[v.type]" class="icon"></span>
            {{ v.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li
          v-for="(good,i) in goods"
          :key="i"
          class="food-list food-list-hook"
          ref="foodlistHeight"
        >
          <h1 class="title">{{ good.name }}</h1>
          <ul>
            <li
              v-for="(food,index) in good.foods"
              :key="index"
              class="food-item"
              @click="selectFood(food)"
            >
              <div class="icon">
                <img width="57" height="57" :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }} 份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart
      :select-foods="selectFoods"
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
    ></shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import shopcart from "../shopcart/shorcart";
import cartcontrol from "../cartcontrol/cartcontrol";
import food from "../food/food";
export default {
  data() {
    return {
      goods: [],
      listHeight: [],
      meunScroll: null,
      foodsScroll: null,
      scrollY: 0,
      selectedFood: {}
    };
  },
  methods: {
    _initiScroll() {
      // 使用 better-scroll 插件 官网复制下来的
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      });

      this.foodsScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let height = 0;
      //   this.listHeight.push(height);

      let foodList = this.$refs.foodlistHeight;

      for (let i = 0; i < foodList.length; i++) {
        let v = foodList[i];
        height += v.clientHeight;
        this.listHeight.push(height);
      }
      this.listHeight.unshift(0);
    },
    selectMenu(index) {
      let foodList = this.$refs.foodlistHeight;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 1000);
    },
    selectFood(food) {
      this.selectedFood = food;
      this.$refs.food.show();
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY > height1 && this.scrollY < height2)) {
          if (i == this.listHeight.length - 1) {
            return 0;
          }
          return i;
        }
      }
    },

    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(v => {
          if (v.count > 0) {
            foods.push(v);
          }
        });
      });
      return foods;
    }
  },
  created() {},
  mounted() {
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
    this.$axios.get(`/goods`).then(v => {
      this.goods = v.data.data;
      this._initiScroll();
      this.$nextTick(() => {
        this._calculateHeight();
        this.meunScroll.refresh();
        this.foodsScroll.refresh();
      });
    });
  },
  components: {
    shopcart,
    cartcontrol,
    food
  },
  props: ["seller"]
};
</script>

<style lang="less" scoped>
@import "../../assets/style/style.less";
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 100%;
      line-height: 14px;
      padding: 0 10px;
      text-align: center;
      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;
        .text {
          .border-none();
        }
      }
      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease {
          background-image: url("../../assets/images/decrease_3@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),
            (min-device-pixel-ratio: 3) {
            background-image: url("../../assets/images/decrease_3@3x.png");
          }
        }
        &.discount {
          background-image: url("../../assets/images/discount_3@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),
            (min-device-pixel-ratio: 3) {
            background-image: url("../../assets/images/discount_3@3x.png");
          }
        }
        &.guarantee {
          background-image: url("../../assets/images/guarantee_3@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),
            (min-device-pixel-ratio: 3) {
            background-image: url("../../assets/images/guarantee_3@3x.png");
          }
        }
        &.invoice {
          background-image: url("../../assets/images/invoice_3@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),
            (min-device-pixel-ratio: 3) {
            background-image: url("../../assets/images/invoice_3@3x.png");
          }
        }
        &.special {
          background-image: url("../../assets/images/special_3@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),
            (min-device-pixel-ratio: 3) {
            background-image: url("../../assets/images/special_3@3x.png");
          }
        }
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        .border-px(rgba(7, 17, 27, 0.3));
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      .border-px(rgba(7, 17, 27, 0.1));
      // .border-px(red);
      &:last-child {
        .border-none();
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          width: 200px;
          line-height: 12px;
          margin-bottom: 8px;
        }
        .extra {
          .count {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cart-control-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="cartcontrol">
    <transition name="decrease">
      <div
        class="cart-decrease glyphicon glyphicon-minus-sign"
        v-show="food.count>0"
        @click.stop="decreaseCart"
      ></div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{ food.count }}</div>

    <div class="cart-add glyphicon glyphicon-plus-sign" @click.stop="addCart"></div>

  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  //   props: ['food'],
  data() {
    return {
      flag: false
    };
  },
  methods: {
    addCart() {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
        // this.food.count = 1
      } else {
        this.food.count++;
      }
    },

    decreaseCart() {
      if (this.food.count) {
        this.food.count--;
      }
    },
    
  },
  created() {}
};
</script>

<style lang="less" scoped>
.cartcontrol {
  font-size: 0;
  .cart-decrease,
  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cart-add {
    display: inline-block;
  }
  
}

.decrease-enter-active,
.decrease-leave-active {
  transition: all 0.5s ease;
}
.decrease-enter,
.decrease-leave-to {
  transform: translateX(10px) rotate(180deg);
  opacity: 0;
}
</style>


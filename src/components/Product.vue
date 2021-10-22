<template>
  <div class="product-wrapper">
    <span v-if="promo" class="promo">PROMO</span>
    <div class="image">
      <div class="image-wrapper">
        <img :src="image" alt="product image">
      </div>
    </div>
    <h1 class="product-title">{{ product.title }}</h1>
    <div class="bottom">
      <p class="price">£{{ price }}</p>
      <div class="button-container">
        <input class="amount" type="text" name="amount" id="amount" v-model="amount">
        <button @click="addToBasket(product)" class="primary">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    product: Object,
    promo: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.setProductDetails()
  },
  data () {
    return {
      image: '',
      amount: 1
    }
  },
  computed: {
    ...mapGetters({
      checkout: 'checkout'
    }),
    price () {
      return this.product.variants[0].price
    }
  },
  methods: {
    setProductDetails () {
      this.setImages()
    },
    setImages () {
      this.image = this.product.images[0].src
    },
    async addToBasket (product) {
      this.$store.dispatch('addItemToBasket', {
        checkoutId: this.checkout.id,
        itemId: product.variants[0].id,
        quantity: this.amount
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .product-wrapper {
    margin: 20px 0;
    padding: 20px;
    box-sizing: border-box;
    max-width: 300px;
    display: flex;
    justify-content: space-between;
    flex-flow: column nowrap;
    position: relative;
    border: 1px solid darken($color: $background-grey, $amount: 10%);
    margin: 10px;
    background: $white;
    box-shadow: 0 0 20px 2px darken($color: $background-grey, $amount: 5%);
    // border-radius: 5px;

    > * {
      flex: 1 1 100%;
    }
  }

  .image {
    margin: 0 auto;

    .image-wrapper {
      height: 250px;
      width: 250px;
      background: $white;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      height: 80%;
    }
  }

  .product-title {
    text-transform: lowercase;
    font-size: 1.6rem;
    font-style: italic;
    margin-bottom: 10px;
    text-align: center;
    margin: 20px 0 10px;
  }

  .price {
    color: $green;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .promo {
    position: absolute;
    top: 0;
    background: $green-dark;
    color: $white;
    padding: 5px 10px;
    font-size: 1.4rem;
    right: 0;
    letter-spacing: 2px;
    // border-radius: 20px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .primary {
    box-shadow: 0 5px 4px transparentize($color: $green-dark, $amount: .9);

    &:hover {
      box-shadow: none;
      transform: none;
    }
  }

  .amount {
    height: 40px;
    padding: 0 10px;
    font-size: 2rem;
    max-width: 30px;
    text-align: center;
    margin: 0 10px;
  }
</style>

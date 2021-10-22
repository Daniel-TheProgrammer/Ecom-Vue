<template>
  <div class="basket-wrapper">
    <div class="basket">
      <h1 class="title">Shopping Cart</h1>
      <div v-if="checkout && checkout.lineItems.length">
        <div v-for="product in checkout.lineItems" :key="product.id" class="cart-item">
          <div class="item-image">
            <div class="image-wrapper">
              <img :src="product.variant.image.src" alt="image">
            </div>
          </div>
          <div class="item-title">
            {{ product.title }}
          </div>
          <div class="item-amount">
            <span class="toggle-arrow" @click="decrementNumber(product.id)">
              <img src="@/assets/down-arrow.svg" alt="down">
            </span>
            <input class="text-input" :id="product.variant.id" type="text" :value="product.quantity">
            <span class="toggle-arrow" @click="incrementNumber(product.variant.id)">
              <img src="@/assets/up-arrow.svg" alt="up">
            </span>
          </div>
          <div class="item-price">
            £{{ product.variant.price }}
          </div>
          <div class="item-remove">
            <img @click="removeItem(product.id)" src="@/assets/error.svg" alt="remove">
          </div>
        </div>
      </div>
      <div v-else>
        <p>There are no items in your cart</p>
      </div>
    </div>
    <div class="payment">
      <div class="go-back">
        <img src="@/assets/left-arrow-white.svg" alt="go back">
        <p>Continue Shopping</p>
      </div>
      <div class="total">
        <p class="total-title">Subtotal:</p>
        <p class="total-cost">£{{ checkout.subtotalPrice }}</p>
      </div>
      <button @click="goCheckout" class="primary checkout-button">Go to checkout</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  created () {
    console.log(this.checkout)
  },
  data () {
    return {
      cart: []
    }
  },
  computed: {
    ...mapGetters({
      checkout: 'checkout'
    })
  },
  methods: {
    incrementNumber (id) {
      this.$store.dispatch('addItemToBasket', {
        checkoutId: this.checkout.id,
        itemId: id
      })
    },
    decrementNumber (id) {
      this.$store.dispatch('updateItemInBasket', {
        checkoutId: this.checkout.id,
        itemId: id,
        state: 'dec'
      })
    },
    removeItem (id) {
      this.$store.dispatch('removeItemFromBasket', {
        checkoutId: this.checkout.id,
        itemId: id
      })
    },
    goCheckout () {
      window.location = this.checkout.webUrl
    }
  }
}
</script>

<style lang="scss" scoped>
  .basket-wrapper {
    padding: 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    // background: $white;
    // box-shadow: 0 0 20px 2px darken($color: $background-grey, $amount: 5%);
  }

  .cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    box-sizing: border-box;
    border-bottom: 1px solid darken($color: $background-grey, $amount: 5%);

    > * {
      padding: 10px 30px;

      &:first-child {
        padding: 10px 30px 10px 0;
      }

      &:last-child {
        padding: 10px 0 10px 30px;
      }
    }
  }

  .title {
    text-align: left;
    padding: 0;
    font-weight: bold;
    font-size: 2rem;
  }

  .item-image {
    .image-wrapper {
      height: 150px;
      width: 150px;
      background: $white;
      box-shadow: 0 0 20px 2px darken($color: $background-grey, $amount: 5%);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      height: 80%;
    }
  }

  .item-title {
    font-size: 1.6rem;
    text-transform: lowercase;
    white-space: wrap;
    width: 250px;
    text-align: left;
  }

  .item-amount {
    max-width: 120px;
    display: flex;
    align-items: center;

    .text-input {
      height: 50px;
      padding: 0 10px;
      width: 100%;
      font-size: 2rem;
      text-align: center;
      margin: 0 10px;
      box-sizing: border-box;
    }

    .toggle-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      img {
        height: 20px;
      }
    }
  }

  .item-remove {
    img {
      height: 30px;
      cursor: pointer;
    }
  }

  .go-back {
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      height: 40px;
      margin-right: 20px;
    }
  }

  .total {
    display: flex;
    margin: 20px 0 0;
  }

  .total-title {
    margin: 0 5px 20px 0;
  }

  .total-cost {
    font-weight: bold;
  }

  .payment {
    background: $green-dark;
    background: linear-gradient(135deg, rgba(63,84,105,1) 0%, rgba(44,62,80,1) 100%);
    // width: 350px;
    padding: 30px 40px;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0 0 20px 2px darken($color: $background-grey, $amount: 5%);
    color: $white;
  }

  .card-details-title {
    font-size: 2rem;
    font-weight: bold;
    text-align: left;
  }

  .input-container {
    margin: 20px 0;
    display: flex;
    flex-flow: column nowrap;
    text-align: left;

    label {
      font-size: 1.6rem;
      margin-bottom: 0;
    }

    .text-input {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      font-size: 20px;
      padding: 0 10px;
      background: transparent;
      border: none;
      border-bottom: 1px solid $white;
      color: $green;

      &:focus {
        outline: none;
        border-bottom: 1px solid $green;
        caret-color: $white;
      }
    }
  }

  .checkout-button {
    font-size: 2.2rem;
    // font-weight: bold;
  }
</style>

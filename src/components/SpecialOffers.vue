<template>
  <div v-if="products.length" class="special-offers-wrapper">
    <!-- <hr> -->
    <div class="top-section">
      <h1 class="title">Special Offers</h1>
      <p>Deserunt labore pariatur id occaecat qui esse laborum proident ea. Nostrud ad est laborum non. Aliqua ut ea do pariatur tempor et qui officia. Non cupidatat veniam incididunt officia sit id. Mollit eiusmod ullamco dolore laborum velit enim.</p>
    </div>
    <div class="products">
      <product v-for="product in products" :key="product.id" :product="product" :promo="true"></product>
    </div>
  </div>
</template>

<script>
import shopify from '@/services/shopify'
import Product from '@/components/Product'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      products: []
    }
  },
  computed: {
    ...mapGetters({
      collections: 'collections'
    })
  },
  watch: {
    collections () {
      this.fetchProduct()
    }
  },
  methods: {
    async fetchProduct () {
      try {
        const { id } = this.collections.find(col => col.title === 'Special Offers')
        const { products } = await shopify.collection.fetchWithProducts(id)

        this.products = products
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    Product
  }
}
</script>

<style lang="scss" scoped>
  .special-offers-wrapper {
    background: $background-grey;
    width: 100%;
    box-sizing: border-box;
    padding: 50px;
  }

  .products {
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-flow: row wrap;
  }

  .top-section {
    max-width: 700px;
    margin: 0 auto 30px;
  }
</style>

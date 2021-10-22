<template>
  <div v-if="products.length" class="featured-products-wrapper">
    <div class="top-section">
      <h1 class="title">Featured Products</h1>
      <p class="paragraph">Commodo amet exercitation voluptate ipsum officia excepteur ea anim. Ut dolore tempor ea cupidatat pariatur anim quis ipsum est. Anim ad occaecat dolore enim amet excepteur eiusmod sit eu laborum consectetur qui fugiat consequat. Officia nulla tempor adipisicing sint fugiat commodo culpa id laboris irure ea ea. Tempor minim ipsum adipisicing et exercitation ad sit et aliqua. Mollit labore excepteur enim in ullamco exercitation commodo in.</p>
    </div>
    <div class="products">
      <product v-for="product in products" :key="product.id" :product="product"></product>
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
        const { id } = this.collections.find(col => col.title === 'Featured')
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
  .featured-products-wrapper {
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

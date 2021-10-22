<template>
  <div class="home-wrapper">
    <div class="home">
      <div class="title-box">
        <h1>Liosis cafe and shop</h1>
        <p>Come join us or order some of Newcastles finest italian food, or shop for some authentic Italian products online.</p>
        <div class="button-container">
          <button class="big">Order Food</button>
          <button class="big">Shop</button>
        </div>
      </div>
    </div>
    <featured-products></featured-products>
    <special-offers></special-offers>
  </div>
</template>

<script>
import FeaturedProducts from '@/components/FeaturedProducts'
import SpecialOffers from '@/components/SpecialOffers'
import shopify from '@/services/shopify'

export default {
  name: 'home',
  created () {
    this.fetchCollections()
  },
  computed: {
  },
  methods: {
    async fetchCollections () {
      try {
        const collections = await shopify.collection.fetchAllWithProducts()
        this.$store.commit('updateCollections', collections)
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    FeaturedProducts,
    SpecialOffers
  }
}
</script>

<style lang="scss" scoped>
  .home {
    height: 60vh;
    width: 100%;
    background: url('~@/assets/pizza.jpg') no-repeat center top fixed;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 50px;
    box-sizing: border-box;
  }

  .title-box {
    // margin-bottom: 100px;
    padding: 50px;
    width: 700px;
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-end;
    // border: 5px solid $white;
    // background: $white;

    h1 {
      font-size: 6rem;
      font-weight: bold;
      color: $white;
      text-align: right;
      margin-bottom: 20px;
      text-shadow: 1px 1px 0 $green-dark;
    }

    p {
      color: $white;
      text-align: right;
      font-size: 2.2rem;
      text-shadow: 1px 1px 0 $green-dark;
    }
  }

  .button-container {
    margin: 20px 0;
  }
</style>

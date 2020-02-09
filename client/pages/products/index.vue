<template>
  <section class="page container products">
    <app-filter class="filter"/>
    <div class="cover">
      <nuxt-link
        v-for="(card, index) in cards"
        :key="index"
        :to="'/products/1'"
        tag="a"
      >
        <kit-card
          :image="card.image"
          :title="card.name"
          :price="card.price"
        >
          <template #controls>
            <div class="card_controls">
              <kit-icon class="card_controls--cart" size="regular">
                add_shopping_cart
              </kit-icon>
            </div>
          </template>
        </kit-card>
      </nuxt-link>
    </div>
    <span class="control control-left">
      <kit-icon size="large">
        filter_list
      </kit-icon>
    </span>
    <span class="control control-right">
      <kit-icon size="large">
        keyboard_arrow_up
      </kit-icon>
    </span>
  </section>
</template>

<script>
import AppFilter from '@/components/products/Filter';

export default {
  components: {
    AppFilter
  },
  data() {
    return {
      option: 'ex',
      value: [1, 200],
      cards: []
    };
  },
  async asyncData({ app }) {
    const cards = await app.$api.products.getList();
    return {
      cards
    };
  }
};
</script>

<style lang="scss" scoped>
.products {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.filter {
  @media ($tablet) {
    display: none;
  }
}

.control {
  position: fixed;
  bottom: 10px;
  display: none;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: $light;
  box-shadow: 0 0 4px 3px rgba(0, 0, 255, 0.1);

  @media ($tablet) {
    display: flex;
  }

  &-left {
    left: 10px;
  }

  &-right {
    right: 10px;
  }
}

.cover {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;

  @media ($tablet) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media ($phablet) {
    grid-template-columns: 1fr 1fr;
  }

  @media ($mobile) {
    grid-template-columns: 1fr;
  }
}

.card_controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>

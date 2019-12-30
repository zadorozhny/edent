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
          :image="card.src"
          :title="card.title"
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
      cards: [
        {
          title: 'Даймондбрайт',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          price: 230
        },
        {
          title: 'Матрицы контурные метал. замковые 50мкм',
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
          price: 530
        },
        {
          title: 'Эндожи №1',
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          price: 1230
        },
        {
          title: 'Keramik block (инзомы)',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          price: 2230
        },
        {
          title: 'VILLACRYL H PIUS (750г+400мл) V4',
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
          price: 2530
        },
        {
          title: '«Мастер» пластина 200г',
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          price: 232
        },
        {
          title: 'Белэкт №10 зерн120/125-106мкм/5кг/',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          price: 99
        },
        {
          title: 'Бура (100гр)',
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
          price: 199
        },
        {
          title: 'Воск Беловакс валики прикусные (палочки 150г(10шт))',
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          price: 120
        },
        {
          title: 'Воск липкий',
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
          price: 1999
        },
      ]
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

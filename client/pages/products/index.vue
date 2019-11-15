<template>
  <section class="container">
    <div class="wrapper">
      <div class="filters">
        <kit-slider v-model="value" :min="0" :max="10000"/>
        <kit-label-group>
          <kit-choice v-model="option" value="ex" related>
            <kit-label type="outline" size="regular" class="text_small">от Дорогих</kit-label>
          </kit-choice>
          <kit-choice v-model="option" value="ch" related>
            <kit-label type="outline" size="regular" class="text_small">от Дешевых</kit-label>
          </kit-choice>
        </kit-label-group>
        <kit-label-group>
          <kit-choice v-model="option" value="a-z" related>
            <kit-label type="outline" size="regular" class="text_small">от А-Я</kit-label>
          </kit-choice>
          <kit-choice v-model="option" value="z-a" related>
            <kit-label type="outline" size="regular" class="text_small">от Я-А</kit-label>
          </kit-choice>
        </kit-label-group>
        <kit-button>Найти</kit-button>
      </div>
      <div class="cover">
        <ul class="container">
          <kit-card
            v-for="(card, index) in cards"
            :key="index"
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
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      option: 'ex',
      value: 1,
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
.wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.filters {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  min-width: 270px;
  height: 600px;
  border-radius: 3px;
  box-sizing: border-box;
  background: $light;
  box-shadow: 0px 1px 4px 0 rgba(0,0,0,0.3);
}
.cover {
  margin-left: 30px;
}
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.card_controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>

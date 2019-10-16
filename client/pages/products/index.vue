<template>
  <section class="container">
    <div class="wrapper">
      <div class="filters">
        <kit-slider v-model="value" :min="0" :max="10000"/>
        <kit-label-group>
          <kit-choice v-model="option" value="ex" related>
            <kit-label type="outline" size="regular" class="text_small">Дорогие</kit-label>
          </kit-choice>
          <kit-choice v-model="option" value="ch" related>
            <kit-label type="outline" size="regular" class="text_small">Дешевые</kit-label>
          </kit-choice>
        </kit-label-group>
        <kit-button>Найти</kit-button>
      </div>
      <div class="cover">
        <div class="search">
          <input class="input" placeholder="Поиск">
        </div>
        <ul class="container">
          <kit-card v-for="(card, index) in cards" :key="index" :image="card.src" :title="card.title">
            <template #controls>
              <div class="card_controls">
                <kit-icon class="card_controls--cart" size="compact">
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
      value: 20,
      cards: [
        { title: 'Товар 1', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
        { title: 'Товар 2', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
        { title: 'Товар 3', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg' },
        { title: 'Товар 4', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
        { title: 'Товар 5', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
        { title: 'Товар 6', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg' },
        { title: 'Товар 7', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
        { title: 'Товар 8', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
        { title: 'Товар 9', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg' },
        { title: 'Товар 10', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
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
.search {
  position: sticky;
  top: 0;
  margin-bottom: 20px;
  height: 40px;
  width: 100%;
  z-index: 2;
}
.input {
  padding: 7px 15px;
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: solid 1px #e6e6e6;
  border-radius: 50px;
  box-sizing: border-box;
  outline: none;
  border: solid 1px #dfe1e5;
  transition: .25s ease-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 1px 4px 0 rgba(0,0,0,0.3);
  }
}
.card_controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2px 7px;
}
</style>

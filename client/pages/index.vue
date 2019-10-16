<template>
  <section class="container">
    <ul class="container">
      <kit-card v-for="(card, index) in cards" :key="index" :image="card.src" :title="card.title"/>
    </ul>
  </section>
</template>

<script>
export default {
  data: () => ({
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
    ],
  })
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.card {
  margin-bottom: 20px;
  width: 220px;
  height: 260px;
  box-shadow: 1px 2px 5px rgba(0,0,0,0.3);
  border-radius: 3px;
  overflow: hidden;
  transition: .25s ease-out;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 4px 8px rgba(0,0,0,0.3);
  }

  &--image {
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>

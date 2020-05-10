<template>
  <div class="card">
    <div class="card--header">
      <img class="card--image" :src="image">
    </div>
    <div class="card--content">
      <span class="card--title">{{ title }}</span>
    </div>
    <div class="card--bottom">
      <span class="card--price">{{ price }} грн</span>
      <slot name="controls"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KitCard',
  props: {
    title: { type: String, default: '' },
    price: { type: Number, default: 0 },
    image: { type: String, default: '' }
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 200px 1fr auto;
  width: 100%;
  height: 296px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  transition: .25s ease-out;
  background: $light;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px 2px rgba(0, 0, 255, 0.15);
  }

  &--header {
    overflow: hidden;
  }

  &--image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &--content {
    height: 100%;
    padding: 7px;
    box-sizing: border-box;
  }

  &--title {
    font-size: 15px;
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &--bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 7px;
  }

  &--price {
    font-size: 18px;
    font-weight: 700
  }
}
</style>

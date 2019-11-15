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
  grid-template-rows: 180px auto auto;
  margin-bottom: 20px;
  width: 220px;
  height: 276px;
  box-shadow: 0px 1px 4px 0 rgba(0,0,0,0.3);
  border-radius: 3px;
  overflow: hidden;
  transition: .25s ease-out;
  background: $light;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 1px 8px 0 rgba(0,0,0,0.3);
  }

  &--header {
    overflow: hidden;
  }

  &--image {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    font-size: 16px;
    font-weight: 700
  }
}
</style>

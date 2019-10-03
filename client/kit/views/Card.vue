<template>
  <div class="card">
    <div class="card--header">
      <img class="card--image" :src="image">
    </div>
    <div class="card--content">
      <span>{{ title }}</span>
    </div>
    <slot name="controls"/>
  </div>
</template>

<script>
export default {
  name: 'KitCard',
  props: {
    title: { type: String, default: '' },
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
  height: 260px;
  box-shadow: 0px 1px 4px 0 rgba(0,0,0,0.3);
  border-radius: 3px;
  overflow: hidden;
  transition: .25s ease-out;
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
}
</style>

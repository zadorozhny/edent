<template>
  <div class="card ripple">
    <div class="card--header">
      <img class="card--image" :src="image">
    </div>
    <div class="content">
      <span>{{ title }}</span>
    </div>
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
    height: 200px;
    overflow: hidden;
  }

  &--image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
}
</style>

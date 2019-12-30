<template>
  <div class="page image_layout">
    <div class="image_layout--content">
      <slot/>
    </div>
    <div class="image_layout--picture">
      <img :src="url">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppImageLayout',
  props: {
    image: { type: String, default: '' }
  },
  data: () => ({}),
  computed: {
    url() {
      return require(`../../../assets/images/${this.image}.svg`);
    }
  }
};
</script>

<style lang="scss" scoped>
.image_layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  margin-left: calc(50% - 1250px / 2);

  &--picture {
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>

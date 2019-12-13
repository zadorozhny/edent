<template>
  <div class="page contact">
    <div class="contact--content"/>
    <div class="contact--picture">
      <img src="~assets/images/call.jpg">
    </div>
  </div>
</template>

<script>

export default {
  layout: 'image',
  data: () => ({})
};
</script>

<style lang="scss" scoped>
.contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  margin-left: calc(50% - 1250px / 2);

  &--picture {
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>

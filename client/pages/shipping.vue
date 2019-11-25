<template>
  <div class="page contact">
    <div class="contact--content"/>
    <div class="contact--picture">
      <img src="~assets/images/contact.jpg">
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({})
};
</script>

<style lang="scss" scoped>
.contact {
  display: grid;
  grid-template-columns: 1fr 1fr;

  &--picture {
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>

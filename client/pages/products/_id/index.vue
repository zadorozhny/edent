<template>
  <div class="wrapper">
    <div class="picture">
      <img :src="value">
    </div>
    <div class="content">
      <p>Lorem Ipsum</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
  })
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;

}
.picture {
  width: 400px;
  height: 400px;
  box-shadow: 0px 1px 4px 0 rgba(0,0,0,0.3);
  border-radius: 3px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

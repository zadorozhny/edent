<template>
  <section class="container"/>
</template>

<script>
export default {
  data: () => ({})
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

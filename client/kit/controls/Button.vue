<template>
  <button v-ripple class="button">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'KitButton'
};
</script>

<style lang="scss" scoped>
.button {
  padding: 10px 20px;
  border: none;
  width: 100%;
  font-size: 15px;
  color: white;
  border-radius: 50px;
  background-color: #283b56;
  cursor: pointer;
  transition: .25s ease-out;
  outline: none;

  &:hover {
    box-shadow: 0px 1px 4px 0 rgba(0,0,0,0.3);
  }
}
</style>

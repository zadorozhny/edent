<template functional>
  <transition name="loader">
    <slot/>
  </transition>
</template>

<script>
export default {
  name: 'KitTransitionLoader'
};
</script>

<style lang="scss" scoped>
.loader {
  &-enter-active,
  &-leave-active {
    transition: opacity .2s ease-out, top .2s ease-out;
  }

  &-enter {
    opacity: 0;
  }

  &-leave-to {
    top: -45px;
    opacity: 0;
  }
}
</style>

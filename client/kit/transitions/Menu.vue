<template functional>
  <transition name="menu">
    <slot/>
  </transition>
</template>

<script>
export default {
  name: 'KitTransitionMenu'
};
</script>

<style lang="scss" scoped>

.menu {
  &-enter-active, &-leave-active {
    transition: opacity .2s ease-out;

    /deep/ .modal--content {
      transition: transform .2s ease-out;
    }
  }
  &-enter, &-leave-to {
    opacity: 0;

    /deep/ .modal--content.left {
      transform: translateX(-100%);
    }

    /deep/ .modal--content.right {
      transform: translateX(100%);
    }
  }
}
</style>

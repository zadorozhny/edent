<template>
  <transition-group name="alert">
    <slot/>
  </transition-group>
</template>

<script>
export default {
  name: 'KitTransitionAlert'
};
</script>

<style lang="scss" scoped>
/deep/ .alert {
  &-enter-active,
  &-leave-active {
    transition: opacity .3s ease-out, margin .3s ease-out;
  }

  &-enter {
    margin-left: 50px;
    opacity: 0;
  }

  &-leave-to {
    margin-top: -45px;
    opacity: 0;
  }
}
</style>

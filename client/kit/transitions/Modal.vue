<template>
  <transition-group name="modal">
    <slot/>
  </transition-group>
</template>

<script>
export default {
  name: 'KitTransitionModal'
};
</script>

<style lang="scss" scoped>
/deep/ .modal {
  &-enter-active,
  &-leave-active {
    transition: opacity .2s ease-out;

    .modal--content {
      position: absolute;
      transition: transform .2s ease-out, opacity .2s ease-out;
    }
  }

  &-enter,
  &-leave-to {
    opacity: 0;

    .modal--content {
      opacity: 0;
      transform: translateY(-80px);
    }
  }

  @media ($tablet) {
    opacity: unset;

    &-enter,
    &-leave-to {
      .modal--content {
        opacity: unset;
        transform: translateX(100%);
      }
    }
  }
}
</style>

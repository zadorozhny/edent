<template>
  <span :class="['icon', { ripple }, size, color]" v-on="$listeners">
    <i class="material-icons">
      <slot/>
    </i>
  </span>
</template>

<script>

export default {
  name: 'KitIcon',
  inheritAttrs: false,
  props: {
    ripple: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'dark',
      validator: size => ['light', 'dark'].includes(size)
    },
    size: {
      type: String,
      default: 'regular',
      validator: size => ['compact', 'regular', 'large'].includes(size)
    },
  }
};
</script>

<style lang="scss" scoped>
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  user-select: none;
  transition: .2s ease-out;

  &.light {
    color: $light;
  }

  &.compact {
    width: 32px;
    height: 32px;

    .material-icons {
      font-size: 24px;
    }
  }

  &.regular {
    width: 40px;
    height: 40px;

    .material-icons {
      font-size: 30px;
    }
  }

  &.large {
    width: 50px;
    height: 50px;

    .material-icons {
      font-size: 36px;
    }
  }

  &.ripple:hover {
    background: $fill;
  }
}
</style>

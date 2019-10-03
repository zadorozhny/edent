<template>
  <div :class="['icon', 'ripple', size]">
    <i class="material-icons">
      <slot/>
    </i>
  </div>
</template>

<script>

export default {
  name: 'KitIcon',
  props: {
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

  &.small {
    width: 32px;
    height: 32px;

    .material-icons {
      font-size: 20px;
    }
  }

  &.regular {
    width: 40px;
    height: 40px;

    .material-icons {
      font-size: 24px;
    }
  }

  &.large {
    width: 50px;
    height: 50px;

    .material-icons {
      font-size: 30px;
    }
  }

  &:hover {
    background: $fill;
  }
}
</style>

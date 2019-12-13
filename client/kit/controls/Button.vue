<template>
  <button :class="['button', 'ripple', `button-${position}`, `button-${type}`]">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'KitButton',
  props: {
    position: {
      type: String,
      default: 'default',
      validator: position => ['bottom', 'default'].includes(position)
    },
    type: {
      type: String,
      default: 'default',
      validator: type => ['success', 'warning', 'default'].includes(type)
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  padding: 10px 20px;
  border: none;
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  border-radius: 50px;
  background-color: $main;
  cursor: pointer;
  transition: .25s ease-out;
  outline: none;

  &:hover {
    box-shadow: 0 0 8px 3px rgba(0, 0, 255, 0.2);
  }

  &-success {
    background: $success;
  }

  @media ($phablet) {
    &-bottom {
      position: fixed;
      left: 0;
      bottom: 0;
      border-radius: 0;
      z-index: 10;
    }
  }
}
</style>

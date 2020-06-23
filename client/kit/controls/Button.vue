<template functional>
  <button :class="['button', 'ripple', 'text_medium', `button-${props.type}`]" v-on="listeners">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'KitButton',
  props: {
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
  font-weight: 500;
  color: white;
  border-radius: 50px;
  background-color: $main;
  cursor: pointer;
  transition: .25s ease-out;
  outline: none;

  &:hover {
    box-shadow: 0 0 4px 2px rgba(0, 0, 255, 0.15);
  }

  &-success {
    background: $success;
  }

  &-warning {
    background: $warning;
  }

  &:disabled {
    box-shadow: none;
    background-color: $disabled;
    pointer-events: none;
    color: $info;
  }
}
</style>

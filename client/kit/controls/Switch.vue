<template>
  <div :class="['switch', position, { inverted }]">
    <div class="switch--label">
      <slot/>
    </div>
    <div class="switch--slider"/>
  </div>
</template>

<script>
export default {
  name: 'KitSwitch',
  props: {
    inverted: { type: Boolean, default: false },
    position: {
      type: String,
      default: 'left',
      validator: position => ['left', 'right'].includes(position)
    }
  }
};
</script>

<style lang="scss" scoped>
.switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;

  &.left {
    flex-direction: row;
  }

  &.right {
    flex-direction: row-reverse;
  }

  &--label {
    display: flex;
    align-items: center;

    .left & {
      margin-right: 10px;
    }

    .right & {
      margin-left: 10px;
    }
  }

  &--slider {
    position: relative;
    width: 50px;
    height: 30px;
    background-color: #ccc;
    border-radius: 34px;
    transition: background-color .3s ease-in-out;

    &:before {
      position: absolute;
      left: 1px;
      bottom: 1px;
      content: '';
      height: 28px;
      width: 28px;
      border-radius: 50%;
      background-color: white;
      transition: transform .3s ease-in-out;
    }
  }

  :not(.inverted) > input:checked + & > &--slider,
  .inverted > input:not(:checked) + & > &--slider {
    background-color: $dark;

    &:before {
      transform: translateX(20px);
    }
  }

  input:focus + & > &--slider {
    box-shadow: 0 0 1px $dark;
  }
}
</style>

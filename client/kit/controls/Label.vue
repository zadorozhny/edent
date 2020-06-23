<template functional>
  <div :class="['label', 'ripple', props.type, props.size, props.shape, { inverted: props.inverted }]" v-on="listeners">
    <div class="label--content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KitLabel',
  props: {
    inverted: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'regular',
      validator: size => ['compact', 'regular', 'large'].includes(size)
    },
    type: {
      type: String,
      default: 'primary',
      validator: type => ['primary', 'secondary', 'outline', 'disabled', 'highlighted'].includes(type)
    },
    shape: {
      type: String,
      default: 'rounded',
      validator: shape => ['rounded', 'rectangular'].includes(shape)
    }
  }
};
</script>

<style lang="scss" scoped>
.label {
  display: flex;
  align-items: center;
  user-select: none;
  box-sizing: border-box;

  &.compact {
    font-size: 12px;
  }

  &.large {
    display: grid;
    border-radius: 0;
  }

  &.rounded {
    border-radius: 100px;
  }

  &.rectangular {
    border-radius: 2px;
  }

  &.highlighted {
    background-color: $main;
    color: $light;

    .choice &:hover {
      background-color: darken($main, 10%);
    }

    .choosed & {
      background-color: $main;
      color: $light;

      &:hover {
        background-color: darken($main, 10%);
      }
    }
  }

  &.primary {
    background-color: $fill;
    color: $main;

    .choice &:hover {
      background-color: darken($fill, 10%);
    }

    .choosed & {
      background-color: $main;
      color: $light;

      &:hover {
        background-color: darken($main, 10%);
      }
    }
  }

  &.outline {
    border: 1px solid $border;

    .choice &:hover {
      background-color: $fill;
    }

    .choosed & {
      background-color: $main;
      color: $light;
      border-color: darken($main, 10%);

      &:hover {
        background-color: darken($main, 10%);
      }
    }
  }

  &.secondary {
    background-color: $main;
    color: $light;

    .choice &:hover {
      background-color: darken($main, 10%);
    }
  }

  &.disabled,
  .choice.disabled & {
    background-color: $disabled;
    border-color: darken($disabled, 5%);
    color: $info;
    pointer-events: none;
  }

  .choice & {
    cursor: pointer;
    transition: background-color .2s ease-out,
      color .2s ease-out;
  }

  &--content {
    width: 100%;
    text-align: center;
    box-sizing: border-box;

    .label.compact & {
      padding: 5px 10px;
    }

    .label.regular & {
      padding: 10px 15px;
    }

    .label.large & {
      padding: 15px;
    }
  }
}
</style>

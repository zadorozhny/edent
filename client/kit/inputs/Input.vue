<template>
  <input
    ref="input"
    v-bind="$attrs"
    :value="value"
    :disabled="disabled"
    :type="$attrs.type"
    :class="['input', size]"
    @input="input($event.target.value)"
    v-on="$listeners"
  >
</template>

<script>
import IMask from 'imask';

export default {
  name: 'KitInput',
  inheritAttrs: false,
  model: {
    event: 'update'
  },
  props: {
    value: { type: String, default: '' },
    size: {
      type: String,
      default: 'regular',
      validator: size => ['compact', 'regular', 'large'].includes(size)
    },
    disabled: { type: Boolean, default: false },
    mask: { type: [String, Function], default: null }
  },
  data: () => ({
    imask: null
  }),
  mounted() {
    if (this.mask) {
      this.imask = new IMask(this.$refs.input, {
        mask: this.mask,
        lazy: false
      });
      this.imask.on('accept', () => this.$emit('update', this.imask.value));
      this.$watch('value', value => this.imask.updateValue(value));
    }
  },
  methods: {
    input(value) {
      if (this.imask) {
        this.imask.value = value;
      } else {
        this.$emit('update', value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  padding: 14px 10px;
  width: 100%;
  border: solid 1px #cfdbdf;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;

  &.compact {
    padding: 10px 10px;
  }
}
</style>

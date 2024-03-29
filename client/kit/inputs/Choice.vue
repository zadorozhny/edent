<template>
  <label :class="['choice', { choosed, disabled }]">
    <input
      v-bind="$attrs"
      :value="value"
      :checked="choosed"
      :disabled="disabled"
      :type="related ? 'radio' : 'checkbox'"
      @change="change"
      v-on="$listeners"
    >
    <slot/>
  </label>
</template>

<script>
export default {
  name: 'KitChoice',
  inheritAttrs: false,
  model: {
    prop: 'model',
    event: 'update'
  },
  props: {
    value: { type: [String, Number, Boolean], default: null },
    model: { type: [Array, String, Number, Boolean], default: null },
    related: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  computed: {
    choosed() {
      if (this.model !== null) {
        return this.related ? this.model === this.value
          : Array.isArray(this.model) ? this.model.includes(this.value)
          : this.model;
      } else {
        return this.$attrs.checked;
      }
    }
  },
  methods: {
    change(event) {
      if (this.related) {
        this.$emit('update', this.value);
      } else if (Array.isArray(this.model)) {
        const index = this.model.indexOf(this.value);
        if (event.target.checked) {
          if (index < 0) {
            this.$emit('update', this.model.concat(this.value));
          }
        } else if (index >= 0) {
          this.$emit('update', this.model.slice(0, index).concat(this.model.slice(index + 1)));
        }
      } else {
        this.$emit('update', event.target.checked);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.choice {
  display: flex;
  cursor: pointer;

  input {
    display: none;
  }

  > * {
    width: 100%;
  }
}
</style>

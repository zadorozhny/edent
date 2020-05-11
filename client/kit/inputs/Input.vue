<template>
  <div class="input">
    <input
      ref="input"
      v-model="proxy"
      v-bind="$attrs"
      :disabled="disabled"
      :type="$attrs.type"
      :class="['input--item', size]"
      @blur="touch"
      v-on="$listeners"
    >
    <div class="input--additional">
      <kit-tooltip v-if="invalid" :content="error" type="warning">
        <kit-icon size="compact" class="input--alert">
          error
        </kit-icon>
      </kit-tooltip>
    </div>
  </div>
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
    value: { type: [String, Number], default: '' },
    vuelidate: { type: Object, default: null },
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
  computed: {
    invalid() {
      return Boolean(this.vuelidate && this.vuelidate.$error);
    },
    error() {
      if (this.invalid) {
        const { params } = this.vuelidate.$flattenParams().find(({ name }) => !this.vuelidate[name]);
        return params && params.message;
      } else {
        return '';
      }
    },
    proxy: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('update', this.imask ? this.imask.value : value);
      }
    }
  },
  mounted() {
    if (this.mask) {
      this.imask = new IMask(this.$refs.input, {
        mask: this.mask
      });
      this.imask.on('accept', () => this.$emit('update', this.imask.value));
      this.$watch('value', value => this.imask.updateValue(value));
    }
  },
  methods: {
    input(target) {
      if (this.imask) {
        this.imask.value = target.value;
      } else {
        this.$emit('update', target.value);
      }
    },
    touch() {
      if (!this._isDestroyed && this.vuelidate) {
        this.vuelidate.$touch();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  text-align: left;

  &--item {
    padding: 14px 10px;
    max-height: 44px;
    width: 100%;
    border: solid 1px #cfdbdf;
    border-radius: 5px;
    font-size: 14px;
    text-align: inherit;
    box-sizing: border-box;
    outline: none;

    &.compact {
      padding: 10px 10px;
    }
  }

  &--additional {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    padding: 5px;
    height: 100%;
    box-sizing: border-box;
    z-index: 2;
  }

  &--alert {
    color: $warning;
    cursor: pointer;
  }
}
</style>

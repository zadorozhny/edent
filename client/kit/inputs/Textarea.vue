<template>
  <div class="textarea">
    <textarea
      ref="input"
      v-model="proxy"
      v-bind="$attrs"
      :disabled="disabled"
      :type="$attrs.type"
      class="textarea--item"
      @blur="touch"
      v-on="$listeners"
    />
    <div class="textarea--additional">
      <kit-tooltip v-if="invalid" :content="error" type="warning">
        <kit-icon size="compact" class="textarea--alert">
          error
        </kit-icon>
      </kit-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KitTextarea',
  inheritAttrs: false,
  model: {
    event: 'update'
  },
  props: {
    value: { type: [String, Number], default: '' },
    vuelidate: { type: Object, default: null },
    disabled: { type: Boolean, default: false }
  },
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
        this.$emit('update', value);
      }
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
.textarea {
  position: relative;

  &--item {
    padding: 14px 10px;
    width: 100%;
    height: 200px;
    border: solid 1px #cfdbdf;
    border-radius: 5px;
    font-size: 14px;
    box-sizing: border-box;
    resize: none;
    outline: none;
  }

  &--additional {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    padding: 5px;
    box-sizing: border-box;
    z-index: 2;
  }

  &--alert {
    color: $warning;
    cursor: pointer;
  }
}
</style>

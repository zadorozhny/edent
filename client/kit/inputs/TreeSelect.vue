<template>
  <div class="treeselect">
    <treeselect
      v-bind="$attrs"
      :value="value"
      :multiple="multiple"
      :options="options"
      :searchable="false"
      :normalizer="normalizer"
      :clearable="false"
      :default-expand-level="3"
      @input="input"
      @close="touch"
      v-on="$listeners"
    />
    <div class="treeselect--additional">
      <kit-tooltip v-if="invalid" :content="error" type="warning">
        <kit-icon size="compact" class="treeselect--alert">
          error
        </kit-icon>
      </kit-tooltip>
    </div>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';

export default {
  name: 'KitTreeSelect',
  components: {
    Treeselect
  },
  inheritAttrs: false,
  props: {
    value: { type: [String, Number, Array], default: '' },
    vuelidate: { type: Object, default: null },
    multiple: { type: Boolean, default: false },
    options: { type: Array, default: () => ([]) }
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
    }
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    },
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children,
      };
    },
    touch() {
      if (!this._isDestroyed && this.vuelidate) {
        this.vuelidate.$touch();
      }
    }
  }
};
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.css"></style>

<style lang="scss">
.vue-treeselect {
  height: 44px;
  outline: none;

  &--single {
    .vue-treeselect__option--selected {
      background: #f3f3f3;
      color: $main !important;
      font-weight: 700;

      &:hover {
        background: $main;
        color: $light !important;
      }
    }
  }

  &__single-value {
    color: $text;
  }

  &__control {
    width: auto;
    height: 100%;
    padding: 0 8px;
    border-color: #cfdbdf !important;
    box-shadow: none !important;
  }

  &__control-arrow {
    padding: 0 8.5px;
    color: #999999;
  }

  &__option-arrow-container {
    &:hover {
      .vue-treeselect__option-arrow {
        color: $light !important;
      }
    }
  }

  &__placeholder {
    padding: 0;
    line-height: 42px;
    color: #9399A7;
  }

  &__single-value {
    padding: 0;
    line-height: 42px;
  }

  &__menu {
    padding: 0;
  }

  &__option--highlight {
    background: $main;
    color: $light !important;
  }

  &__option {
    padding-top: 7px;
    padding-bottom: 7px;
  }
}

.treeselect {
  position: relative;

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
    background: white;
  }
}
</style>

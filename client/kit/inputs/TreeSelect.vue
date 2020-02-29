<template>
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
    v-on="$listeners"
  />
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
    multiple: { type: Boolean, default: false },
    options: { type: Array, default: () => ([]) }
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
    }
  }
};
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.css"></style>

<style lang="scss">
.vue-treeselect {
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

  &__control {
    width: auto;
    height: 48px;
    padding: 0 8px;
    border-color: #e8e8e8 !important;
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
    line-height: 46px;
    color: #9399A7;
  }

  &__single-value {
    padding: 0;
    line-height: 46px;
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
</style>

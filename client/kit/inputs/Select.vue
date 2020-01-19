<template>
  <multiselect
    :value="value"
    :options="options"
    :searchable="false"
    :show-labels="false"
    :placeholder="placeholder"
    @select="select"
  >
    <template slot="option" slot-scope="props">
      <span>{{ props.option }}</span>
    </template>
  </multiselect>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  name: 'KitSelect',
  components: { Multiselect },
  props: {
    value: { type: [String, Number], default: null },
    options: { type: Array, default: () => [] },
    size: {
      type: String,
      default: 'regular',
      validator: size => ['compact', 'regular', 'large'].includes(size)
    },
    placeholder: { type: String, default: '' },
  },
  methods: {
    select(value) {
      this.$emit('input', value);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.multiselect {
  height: 48px;
  font-size: 14px;

  &__input {
    font-size: 14px;
  }

  &__single {
    font-size: 14px;
  }

  &__select {
    height: 48px;

    &:before {
      top: 58%;
    }
  }

  &__tags {
    height: 48px;
    padding-top: 13px;
  }

  &__placeholder {
    color: $info;
  }

  &__option {
    &--highlight {
      background: $main;
      color: $light;
    }

    &--selected {
      &.multiselect__option--highlight {
        background: $main;
        color: $light;
      }
    }
  }
}
</style>
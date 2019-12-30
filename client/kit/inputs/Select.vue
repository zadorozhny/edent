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
.multiselect, .multiselect__input, .multiselect__single {
  font-size: 14px;
}

.multiselect__option--selected.multiselect__option--highlight {
  background: $main;
  color: $light;
}
.multiselect__option--highlight {
  background: $main;
  color: $light;
}
</style>

<template>
  <div class="filter">
    <kit-slider v-if="interval.max" v-model="proxy.price" :min="interval.min" :max="interval.max"/>
    <kit-select
      v-model="proxy.categoryId"
      :options="categories"
      placeholder="Категории"
    />
    <kit-select
      v-model="proxy.manufacturerId"
      :options="manufacturers"
      placeholder="Производители"
    />
    <kit-label-group>
      <kit-choice v-model="proxy.order" value="DESC" related>
        <kit-label type="outline" size="regular">Дорогие</kit-label>
      </kit-choice>
      <kit-choice v-model="proxy.order" value="ASC" related>
        <kit-label type="outline" size="regular">Дешевые</kit-label>
      </kit-choice>
    </kit-label-group>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => ({}) },
    interval: {
      type: Object,
      default: () => ({ min: 0, max: 0 })
    }
  },
  computed: {
    proxy: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    manufacturers() {
      return this.$store.state.common.manufacturers;
    },
    categories() {
      return this.$store.state.common.categories;
    }
  }
};
</script>

<style lang="scss" scoped>
.filter {
  position: sticky;
  top: 71px;
  display: grid;
  grid-row-gap: 40px;
  padding: 10px;
  margin-right: 30px;
  min-width: 270px;
  border-radius: 3px;
  box-sizing: border-box;
  background: $light;
  box-shadow: 0 0 4px 3px rgba(0, 0, 255, 0.1);
}
</style>

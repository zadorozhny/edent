<template>
  <div class="filter">
    <kit-slider v-if="interval.max" v-model="proxy.price" :min="interval.min" :max="interval.max"/>
    <kit-tree-select
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
      <kit-choice v-model="proxy.order" value="price,DESC" related>
        <kit-label type="outline" size="regular">Дорогие</kit-label>
      </kit-choice>
      <kit-choice v-model="proxy.order" value="price,ASC" related>
        <kit-label type="outline" size="regular">Дешевые</kit-label>
      </kit-choice>
    </kit-label-group>
    <kit-label-group>
      <kit-choice v-model="proxy.order" value="createdAt,ASC" related>
        <kit-label type="outline" size="regular">Новые</kit-label>
      </kit-choice>
      <kit-choice v-model="proxy.order" value="createdAt,DESC" related>
        <kit-label type="outline" size="regular">Старые</kit-label>
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
      return [
        {
          id: 0,
          name: 'Все'
        },
        ...this.$store.state.common.manufacturers
      ];
    },
    categories() {
      return [
        {
          id: 0,
          name: 'Все'
        },
        ...this.$store.state.common.categories
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.filter {
  display: grid;
  grid-row-gap: 40px;
  grid-auto-rows: max-content;
  align-items: flex-start;
  padding: 10px;
  margin-right: 30px;
  min-width: 270px;
  border-radius: 3px;
  box-sizing: border-box;
  background: $light;
  box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);
  overflow: auto;

  @media ($tablet) {
    position: absolute;
    margin-right: 0;
    padding: 25px 10px;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    box-shadow: none;
  }
}
</style>

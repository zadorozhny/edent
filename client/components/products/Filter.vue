<template>
  <div class="filter">
    <kit-slider v-model="value" :min="0" :max="1000"/>
    <kit-select
      v-model="selectValue"
      :options="selectOptions"
    />
    <kit-select
      v-model="selectValue"
      :options="selectOptions"
    />
    <kit-label-group>
      <kit-choice v-model="option" value="ex" related>
        <kit-label type="outline" size="regular">Дорогие</kit-label>
      </kit-choice>
      <kit-choice v-model="option" value="ch" related>
        <kit-label type="outline" size="regular">Дешевые</kit-label>
      </kit-choice>
    </kit-label-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectValue: null,
      selectOptions: [1, 2, 3],
      option: 'ex',
      value: [1, 200]
    };
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

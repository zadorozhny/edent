<template>
  <div class="filter">
    <kit-select
      v-model="selectValue"
      :options="selectOptions"
      placeholder="Статус"
    />
    <kit-select
      v-model="selectValue"
      :options="selectOptions"
      placeholder="Дата"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectValue: null,
      selectOptions: [1, 2, 3]
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

<template>
  <div class="table">
    <div class="table--header">
      <slot name="header"/>
    </div>
    <div v-for="(item, index) in items" :key="index" class="table--item">
      <slot v-bind="{ ...item, index }"/>
    </div>
    <slot name="footer"/>
  </div>
</template>

<script>
export default {
  name: 'KitTable',
  props: {
    items: {
      type: Array,
      default: () => ([
        { name: 'Даймондбрайт', price: 1299, count: 2 },
        { name: 'Даймондбрайт', price: 1299, count: 2 },
        { name: 'Даймондбрайт', price: 1299, count: 2 },
        { name: 'Даймондбрайт', price: 1299, count: 2 },
        { name: 'Даймондбрайт', price: 1299, count: 2 },
        { name: 'Даймондбрайт', price: 1299, count: 2 }
      ])
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  padding: 5px;
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  background: $light;
  box-shadow: 0 0 4px 3px rgba(0, 0, 255, 0.1);
  overflow: hidden;

  &--header {
    color: #94979a;
    font-size: 16px;
    font-weight: 600;
    background: #f7f9f8;
  }

  &--item {
    font-size: 16px;
    font-weight: 600;
    border-bottom: solid 1px $border;

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>

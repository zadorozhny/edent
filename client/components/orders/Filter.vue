<template>
  <div class="filter">
    <kit-select
      v-model="proxy.status"
      :options="statuses"
      placeholder="Статус"
    />
    <kit-select
      v-model="proxy.shipping"
      :options="shipping"
      placeholder="Доставка"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      statuses: [
        { id: 'pending', name: 'В работе' },
        { id: 'finished', name: 'Завершен' },
        { id: 'closed', name: 'Отменен' }
      ],
      shipping: [
        { id: 'post', name: 'Почта' },
        { id: 'courier', name: 'Курьер' },
      ]
    };
  },
  computed: {
    proxy: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
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

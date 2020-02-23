<template>
  <section class="page container orders">
    <app-filter class="filter"/>
    <div class="cover">
      <div class="orders--header">
        <kit-input placeholder="Поиск" type="search"/>
      </div>
      <kit-table class="table" :items="items">
        <template #header>
          <div class="table--header">
            <div class="table--section">
              <span>Номер</span>
            </div>
            <div class="table--section">
              <span>Телефон</span>
            </div>
            <div class="table--section">
              <span>Адрес</span>
            </div>
            <div class="table--section">
              <span>Статус</span>
            </div>
            <div class="table--section">
              <span>Дата</span>
            </div>
          </div>
        </template>
        <template #default="{ id, phone, address, status, createdAt }">
          <div class="table--item">
            <div class="table--section">
              <span>{{ id }}</span>
            </div>
            <div class="table--section">
              <span>380982784979</span>
            </div>
            <div class="table--section">
              <span>{{ address }}</span>
            </div>
            <div class="table--section">
              <span>{{ status }}</span>
            </div>
            <div class="table--section">
              <span>{{ createdAt }}</span>
            </div>
          </div>
        </template>
      </kit-table>
    </div>
  </section>
</template>

<script>
import AppFilter from '@/components/orders/Filter';

export default {
  layout: 'admin',
  components: {
    AppFilter
  },
  data() {
    return {
      items: []
    };
  },
  async asyncData({ app }) {
    const items = await app.$api.orders.getList();
    return {
      items
    };
  }
};
</script>

<style lang="scss" scoped>
.orders {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  &--header {
    display: grid;
    grid-template-columns: 360px 200px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
}

.cover {
  width: 100%;
}

.table {
  &--header {
    display: grid;
    grid-template-columns: 80px 145px minmax(0, 1fr) 110px 90px;
  }

  &--section {
    display: flex;
    align-items: center;
    padding: 15px 10px;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &--item {
    display: grid;
    grid-template-columns: 80px 145px minmax(0, 1fr) 110px 90px;
  }
}
</style>

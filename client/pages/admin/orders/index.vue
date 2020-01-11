<template>
  <section class="page container orders">
    <app-filter class="filter"/>
    <div class="cover">
      <div class="orders--header">
        <kit-input placeholder="Поиск" type="search"/>
        <nuxt-link tag="a" to="/admin/products/create">
          <kit-button>Создать</kit-button>
        </nuxt-link>
      </div>
      <kit-table class="table">
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
        <template #default="{ id, phone, address, status, date }">
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
              <span>Завершен</span>
            </div>
            <div class="table--section">
              <span>12/11/20</span>
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
      option: 'ex',
      value: [1, 200]
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

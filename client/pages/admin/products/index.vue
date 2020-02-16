<template>
  <section class="page container products">
    <app-filter class="filter"/>
    <div class="cover">
      <div class="products--header">
        <kit-input placeholder="Поиск" type="search"/>
        <nuxt-link tag="a" to="/admin/products/create">
          <kit-button>Создать</kit-button>
        </nuxt-link>
      </div>
      <kit-table class="table" :items="items">
        <template #header>
          <div class="table--header">
            <div class="table--section">
              <span>Номер</span>
            </div>
            <div class="table--section">
              <span>Название</span>
            </div>
            <div class="table--section">
              <span>Цена</span>
            </div>
            <div class="table--section">
              <span>Скрыт</span>
            </div>
          </div>
        </template>
        <template #default="{ id, name, price }">
          <div class="table--item">
            <div class="table--section">
              <span>{{ id }}</span>
            </div>
            <div class="table--section">
              <span>{{ name }}</span>
            </div>
            <div class="table--section">
              <span>{{ price }}</span>
            </div>
            <div class="table--section">
              <kit-icon>
                remove_red_eye
              </kit-icon>
            </div>
          </div>
        </template>
      </kit-table>
      <div class="products--footer">
        <kit-pagination/>
      </div>
    </div>
  </section>
</template>

<script>
import AppFilter from '@/components/products/Filter';

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
    const items = await app.$api.products.getList();
    return {
      items
    };
  }
};
</script>

<style lang="scss" scoped>
.products {
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

  &--footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}

.cover {
  width: 100%;
}

.table {
  &--header {
    display: grid;
    grid-template-columns: 140px minmax(0, 1fr) 140px 140px;
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
    grid-template-columns: 140px minmax(0, 1fr) 140px 140px;
  }
}
</style>

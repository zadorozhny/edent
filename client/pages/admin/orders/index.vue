<template>
  <section class="page container orders">
    <app-filter v-model="filter" class="filter"/>
    <div class="cover">
      <div class="orders--header">
        <kit-input v-model="filter.search" placeholder="Поиск" type="search"/>
      </div>
      <kit-table class="table" :items="rows">
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
              <span>{{ phone }}</span>
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
      <div class="orders--footer">
        <kit-pagination/>
      </div>
    </div>
  </section>
</template>

<script>
import AppFilter from '@/components/orders/Filter';
import utils from '@/utils';

export default {
  layout: 'admin',
  components: {
    AppFilter
  },
  data() {
    return {
      rows: [],
      filter: {
        search: '',
        status: '',
        shipping: ''
      }
    };
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        this.getList();
      }
    }
  },
  async asyncData({ app }) {
    const { rows } = await app.$api.orders.getList();
    return {
      rows,
      filter: {
        search: '',
        status: '',
        shipping: ''
      }
    };
  },
  methods: {
    getList: utils.debounce(async function () {
      const { rows } = await this.$api.orders.getList({
        search: this.filter.search || undefined,
        status: this.filter.status || undefined,
        shipping: this.filter.shipping || undefined,
      });
      this.rows = rows;
    }, 500)
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

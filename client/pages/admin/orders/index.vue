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
          <nuxt-link class="table--item" :to="`orders/${id}`">
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
              <span>{{ statuses[status] }}</span>
            </div>
            <div class="table--section">
              <span>{{ $luxon.DateTime.fromISO(createdAt).toLocaleString($luxon.DateTime.DATETIME_SHORT) }}</span>
            </div>
          </nuxt-link>
        </template>
      </kit-table>
      <div class="orders--footer">
        <kit-pagination
          :count="count"
          :limit="pagination.limit"
          :offset="pagination.offset"
          @change="paginate"
        />
      </div>
    </div>
  </section>
</template>

<script>
import AppFilter from '@/components/orders/Filter';
import { statuses } from '@/config';
import utils from '@/utils';

const LIMIT = 20;

export default {
  layout: 'admin',
  components: {
    AppFilter
  },
  data() {
    return {
      statuses,
      rows: [],
      count: 0,
      filter: {
        search: '',
        status: '',
        shipping: ''
      },
      pagination: {
        offset: 0,
        limit: LIMIT
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
    const { rows, count } = await app.$api.orders.getList({
      offset: 0,
      limit: LIMIT
    });
    return {
      rows,
      count,
      filter: {
        search: '',
        status: '',
        shipping: ''
      }
    };
  },
  methods: {
    getList: utils.debounce(async function () {
      const { rows, count } = await this.$api.orders.getList({
        search: this.filter.search || undefined,
        status: this.filter.status || undefined,
        shipping: this.filter.shipping || undefined,
        limit: this.pagination.limit,
        offset: this.pagination.offset
      });
      this.rows = rows;
      this.count = count;
    }, 500),
    paginate(value) {
      this.pagination.offset = Math.min(this.count, this.pagination.offset + LIMIT * value);
      this.getList();
    }
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
    grid-template-columns: 80px 180px minmax(0, 1fr) 110px 170px;
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
    grid-template-columns: 80px 180px minmax(0, 1fr) 110px 170px;
  }
}
</style>

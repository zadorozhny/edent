<template>
  <section class="page container admin_page">
    <app-filter v-model="filter" class="admin_page--filter"/>
    <div class="admin_page--cover">
      <div class="admin_page--header">
        <div class="admin_page--filters">
          <kit-input v-model="filter.search" class="admin_page--search" placeholder="Поиск" type="search"/>
          <div class="admin_page--filters_icon" @click="modals.filter = !modals.filter">
            <kit-icon>
              filter_list
            </kit-icon>
          </div>
        </div>
      </div>
      <kit-table class="table" width="700px" :items="rows">
        <template #header>
          <div class="table--row table--header">
            <app-table-section>
              Номер
            </app-table-section>
            <app-table-section>
              Телефон
            </app-table-section>
            <app-table-section>
              Адрес
            </app-table-section>
            <app-table-section>
              Статус
            </app-table-section>
            <app-table-section>
              Дата
            </app-table-section>
          </div>
        </template>
        <template #default="{ id, phone, address, status, createdAt }">
          <nuxt-link class="table--row table--item" :to="`orders/${id}`">
            <app-table-section>
              {{ id }}
            </app-table-section>
            <app-table-section>
              {{ phone }}
            </app-table-section>
            <app-table-section>
              {{ address }}
            </app-table-section>
            <app-table-section>
              {{ statuses[status] }}
            </app-table-section>
            <app-table-section>
              {{ $luxon.DateTime.fromISO(createdAt).toLocaleString($luxon.DateTime.DATETIME_SHORT) }}
            </app-table-section>
          </nuxt-link>
        </template>
      </kit-table>
      <div class="admin_page--footer">
        <kit-pagination
          :count="count"
          :limit="pagination.limit"
          :offset="pagination.offset"
          @change="paginate"
        />
      </div>
    </div>
    <kit-modal
      v-if="modals.filter && $mq !== 'desktop'"
      name="filter"
      @close="modals.filter = false"
    >
      <app-filter v-model="filter"/>
    </kit-modal>
  </section>
</template>

<script>
import AppFilter from '@/components/orders/Filter';
import AppTableSection from '@/components/common/TableSection';
import { statuses } from '@/config';
import utils from '@/utils';

const LIMIT = 20;

export default {
  layout: 'admin',
  components: {
    AppFilter,
    AppTableSection
  },
  data() {
    return {
      statuses,
      modals: {
        filter: false
      },
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
.admin_page {
  position: relative;
  display: grid;
  grid-template-columns: max(270px) 1fr;
  column-gap: 30px;
  align-items: flex-start;

  @media ($tablet) {
    grid-template-columns: 100%;
    column-gap: 0;
  }

  &--cover {
    display: grid;
    grid-template-columns: 1fr;
  }

  &--filter {
    @media ($tablet) {
      display: none;
    }
  }

  &--header {
    display: grid;
    grid-template-columns: 360px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    @media ($phablet) {
      grid-template-columns: 1fr;
    }
  }

  &--filters {
    display: flex;
    align-items: center;
  }

  &--search {
    width: 100%;
  }

  &--filters_icon {
    display: none;
    margin-left: 10px;

    @media ($tablet) {
      display: block;
    }
  }

  &--footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}

.table {
  &--row {
    display: grid;
    grid-template-columns: 80px 180px minmax(0, 1fr) 110px 170px;

    @media ($mobile) {
      padding: 6px 0;
      font-size: 14px;
    }
  }
}
</style>

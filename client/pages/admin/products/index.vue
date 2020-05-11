<template>
  <section class="page container admin_page">
    <app-filter v-model="filter" class="filter admin_page--filter" :interval="interval"/>
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
        <nuxt-link tag="a" to="/admin/products/create">
          <kit-button>Создать</kit-button>
        </nuxt-link>
      </div>
      <kit-table class="table" width="700px" :items="rows">
        <template #header>
          <div class="table--header table--row">
            <app-table-section>
              Номер
            </app-table-section>
            <app-table-section>
              Название
            </app-table-section>
            <app-table-section>
              Цена
            </app-table-section>
            <app-table-section>
              Скрыт
            </app-table-section>
          </div>
        </template>
        <template #default="{ id, name, price, isHidden }">
          <nuxt-link class="table--item table--row" :to="`products/${id}`">
            <app-table-section>
              {{ id }}
            </app-table-section>
            <app-table-section>
              {{ name }}
            </app-table-section>
            <app-table-section>
              {{ price }}
            </app-table-section>
            <div>
              <kit-icon :class="{ 'icon-hidden': isHidden }" @click.prevent="hide(id)">
                remove_red_eye
              </kit-icon>
            </div>
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
      <app-filter v-model="filter" :interval="interval"/>
    </kit-modal>
  </section>
</template>

<script>
import AppFilter from '@/components/products/Filter';
import AppTableSection from '@/components/common/TableSection';
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
      modals: {
        filter: false
      },
      rows: [],
      count: 0,
      interval: {
        min: 0,
        max: 0
      },
      filter: {
        search: '',
        price: [0, 0],
        manufacturerId: null,
        categoryId: null,
        order: 'price,DESC'
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
    const { rows, count, min, max } = await app.$api.products.getList({
      order: 'price,DESC',
      offset: 0,
      limit: LIMIT
    });
    return {
      rows,
      count,
      interval: {
        min,
        max
      },
      filter: {
        search: '',
        price: [min, max],
        manufacturerId: null,
        categoryId: null,
        order: 'price,DESC'
      }
    };
  },
  methods: {
    getList: utils.debounce(async function () {
      const { rows, count } = await this.$api.products.getList({
        search: this.filter.search || undefined,
        manufacturerId: this.filter.manufacturerId || undefined,
        categoryId: this.filter.categoryId || undefined,
        order: this.filter.order || undefined,
        price: JSON.stringify(this.filter.price),
        limit: this.pagination.limit,
        offset: this.pagination.offset
      });
      this.rows = rows;
      this.count = count;
    }, 500),
    hide(id) {
      const product = this.rows.find(product => product.id === id);
      product.isHidden = !product.isHidden;
      try {
        this.$api.products.update({
          productId: id,
          isHidden: product.isHidden
        });
      } catch (err) {
        product.isHidden = !product.isHidden;
        this.$alert.error(err.message);
      }
    },
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
  align-items: flex-start;
  column-gap: 30px;

  @media ($tablet) {
    grid-template-columns: 100%;
    column-gap: 0;
  }

  &--cover {
    display: grid;
    grid-template-columns: 1fr;
  }

  &--filter {
    max-width: 270px;

    @media ($tablet) {
      display: none;
    }
  }

  &--header {
    display: grid;
    grid-template-columns: minmax(0, 360px) minmax(0, 200px);
    column-gap: 20px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    @media ($phablet) {
      grid-template-columns: 1fr;
      row-gap: 20px;
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
    grid-template-columns: 140px minmax(0, 1fr) 140px 140px;

    @media ($mobile) {
      padding: 6px 0;
      font-size: 14px;
    }
  }
}

.icon-hidden {
  opacity: 0.4
}
</style>

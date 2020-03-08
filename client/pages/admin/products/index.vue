<template>
  <section class="page container products">
    <app-filter v-model="filter" class="filter admin" :interval="interval"/>
    <div class="cover">
      <div class="products--header">
        <kit-input v-model="filter.search" placeholder="Поиск" type="search"/>
        <nuxt-link tag="a" to="/admin/products/create">
          <kit-button>Создать</kit-button>
        </nuxt-link>
      </div>
      <kit-table class="table" :items="rows">
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
        <template #default="{ id, name, price, isHidden }">
          <nuxt-link class="table--item" :to="`products/${id}`">
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
              <kit-icon :class="{ 'icon-hidden': isHidden }" @click.prevent="hide(id)">
                remove_red_eye
              </kit-icon>
            </div>
          </nuxt-link>
        </template>
      </kit-table>
      <div class="products--footer">
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
import AppFilter from '@/components/products/Filter';
import utils from '@/utils';

const LIMIT = 20;

export default {
  layout: 'admin',
  components: {
    AppFilter
  },
  data() {
    return {
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
        order: 'DESC'
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
        order: 'DESC'
      }
    };
  },
  methods: {
    getList: utils.debounce(async function () {
      const { rows, count } = await this.$api.products.getList({
        search: this.filter.search || undefined,
        manufacturerId: this.filter.manufacturerId || undefined,
        categoryId: this.filter.categoryId || undefined,
        order: this.filter.order ? `price,${this.filter.order}` : undefined,
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

.icon-hidden {
  opacity: 0.4
}
</style>

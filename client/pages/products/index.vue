<template>
  <section class="page container products">
    <app-filter v-model="filter" :interval="interval" class="products--filter"/>
    <div class="products--cover">
      <nuxt-link
        v-for="(row, index) in rows"
        :key="index"
        :to="`/products/${row.id}`"
        tag="a"
      >
        <kit-card
          :image="row.image"
          :title="row.name"
          :price="row.price"
        >
          <template #controls>
            <div class="card_controls">
              <kit-icon class="card_controls--cart" size="regular" @click.prevent="add(row)">
                add_shopping_cart
              </kit-icon>
            </div>
          </template>
        </kit-card>
      </nuxt-link>
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

const LIMIT = 3;
const TOLERANCE = 100;

export default {
  components: {
    AppFilter
  },
  data() {
    return {
      loading: false,
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
        order: 'price,DESC',
        isHidden: false,
      },
      pagination: {
        offset: 0,
        limit: LIMIT
      }
    };
  },
  computed: {
    debounce() {
      return this.$utils.debounce(this.getList, 500);
    },
    throttle() {
      return this.$utils.throttle(this.getList, 300);
    }
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        if (this.pagination.offset) {
          this.pagination.offset = 0;
        }
        this.debounce();
      }
    },
    rows: {
      immediate: true,
      deep: true,
      handler() {
        this.$nextTick(() => {
          if (
            this.element.scrollTop + this.element.clientHeight === this.element.scrollHeight
            && this.rows.length < this.count
            && this.rows.length
          ) {
            this.getList();
          }
        });
      }
    }
  },
  async asyncData({ app }) {
    const { rows, count, min, max } = await app.$api.products.getList({
      order: 'price,DESC',
      isHidden: false,
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
      },
      pagination: {
        offset: rows.length,
        limit: LIMIT
      }
    };
  },
  mounted() {
    this.element = document.getElementById('scroll');
    this.element.addEventListener('scroll', this.scroll.bind(this));
    this.$event.$on('search', value => {
      this.filter = {
        ...this.filter,
        search: value
      };
    });
    this.$event.$on('show_filter', () => {
      this.modals = {
        filter: !this.modals.filter
      };
    });
  },
  destroyed() {
    this.element.removeEventListener('scroll', this.scroll.bind(this));
    this.$event.$off('search');
    this.$event.$off('show_filter');
  },
  methods: {
    scroll() {
      if (
        !this.loading
        && this.element.scrollTop + this.element.clientHeight + TOLERANCE > this.element.scrollHeight
      ) {
        if (this.count > this.pagination.offset) {
          this.throttle();
        }
      }
    },
    add(product) {
      const products = { ...this.$storage.products };
      if (products[product.id]) {
        products[product.id].count += 1;
      } else {
        products[product.id] = { ...product, count: 1 };
      }
      this.$storage.products = products;
      this.$alert.success('Товар добавлен');
    },
    async getList() {
      try {
        this.$loader.start();
        this.loading = true;
        const { rows, count } = await this.$api.products.getList({
          search: this.filter.search || undefined,
          manufacturerId: this.filter.manufacturerId || undefined,
          categoryId: this.filter.categoryId || undefined,
          order: this.filter.order || undefined,
          price: JSON.stringify(this.filter.price),
          limit: this.pagination.limit,
          offset: this.pagination.offset
        });
        if (this.pagination.offset) {
          this.rows.push(...rows);
        } else {
          this.rows = rows;
        }
        this.count = count;
        this.pagination.offset = Math.min(this.count, this.pagination.offset + rows.length);
      } catch (err) {
        this.$loader.finish();
        this.$alert.error(err.message);
      } finally {
        this.$loader.finish();
        this.$nextTick(() => {
          this.loading = false;
        });
      }
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
  padding-top: 0;
  padding-bottom: 0;

  &--filter {
    position: sticky;
    top: 15px;
    max-width: 270px;

    @media ($tablet) {
      display: none;
    }
  }

  &--cover {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    padding: 15px 0;
    width: 100%;

    @media ($tablet) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media ($phablet) {
      grid-template-columns: 1fr 1fr;
    }

    @media ($mobile) {
      grid-template-columns: 1fr;
    }
  }
}

.control {
  position: fixed;
  bottom: 10px;
  display: none;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: $light;
  box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);

  @media ($tablet) {
    display: flex;
  }

  &-left {
    left: 10px;
  }

  &-right {
    right: 10px;
  }
}

.card_controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>

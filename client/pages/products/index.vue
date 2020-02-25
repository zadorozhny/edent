<template>
  <section class="page container products">
    <app-filter v-model="filter" :interval="interval" class="filter"/>
    <div class="cover">
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
    <span class="control control-left">
      <kit-icon size="large">
        filter_list
      </kit-icon>
    </span>
    <span class="control control-right">
      <kit-icon size="large">
        keyboard_arrow_up
      </kit-icon>
    </span>
  </section>
</template>

<script>
import AppFilter from '@/components/products/Filter';
// import utils from '@/utils';

const LIMIT = 2;
const TOLERANCE = 50;

export default {
  components: {
    AppFilter
  },
  data() {
    return {
      option: 'ex',
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
  computed: {
    debounce() {
      return this.$utils.debounce(this.getList, 200);
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
            document.body.scrollHeight === window.innerHeight
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
      },
      pagination: {
        offset: rows.length,
        limit: LIMIT
      }
    };
  },
  mounted() {
    let disabled = false;
    document.addEventListener('scroll', () => {
      if (!disabled && window.pageYOffset + TOLERANCE > document.body.scrollHeight - window.innerHeight) {
        disabled = true;
        if (this.count > this.pagination.offset) {
          this.throttle();
          this.$nextTick(() => {
            disabled = false;
          });
        }
      }
    });
    this.$event.$on('search', value => {
      this.filter = {
        ...this.filter,
        search: value
      };
    });
  },
  methods: {
    add(product) {
      const products = { ...this.$storage.products };
      if (products[product.id]) {
        products[product.id].count += 1;
      } else {
        products[product.id] = { ...product, count: 1 };
      }
      this.$storage.products = products;
    },
    async getList() {
      const { rows, count } = await this.$api.products.getList({
        search: this.filter.search || undefined,
        manufacturerId: this.filter.manufacturerId || undefined,
        categoryId: this.filter.categoryId || undefined,
        order: this.filter.order ? `price,${this.filter.order}` : undefined,
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
}

.filter {
  @media ($tablet) {
    display: none;
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
  box-shadow: 0 0 4px 3px rgba(0, 0, 255, 0.1);

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

.cover {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;

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

.card_controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>

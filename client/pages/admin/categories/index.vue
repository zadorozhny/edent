<template>
  <section class="page container categories">
    <div class="cover">
      <div class="categories--header">
        <kit-input v-model="filter.search" placeholder="Поиск" type="search"/>
        <nuxt-link tag="a" to="/admin/categories/create">
          <kit-button>Создать</kit-button>
        </nuxt-link>
      </div>
      <kit-table class="table" :items="rows">
        <template #header>
          <div class="table--header">
            <div class="table--section">
              <span>Название</span>
            </div>
          </div>
        </template>
        <template #default="{ id, name }">
          <nuxt-link class="table--item" :to="`categories/${id}`">
            <div class="table--section">
              <span>{{ name }}</span>
            </div>
          </nuxt-link>
        </template>
      </kit-table>
    </div>
  </section>
</template>

<script>
import utils from '@/utils';

export default {
  layout: 'admin',
  data() {
    return {
      rows: [],
      filter: {
        search: ''
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
    const rows = await app.$api.categories.getList();
    return {
      rows
    };
  },
  methods: {
    getList: utils.debounce(async function () {
      this.rows = await this.$api.categories.getList({
        search: this.filter.search || undefined
      });
    }, 500)
  }
};
</script>

<style lang="scss" scoped>
.categories {
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
    grid-template-columns: 1fr;
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
    grid-template-columns: 1fr;
  }
}
</style>

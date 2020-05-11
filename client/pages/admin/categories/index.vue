<template>
  <section class="page container admin_page">
    <div class="admin_page--cover">
      <div class="admin_page--header">
        <kit-input v-model="filter.search" placeholder="Поиск" type="search"/>
        <nuxt-link tag="a" to="/admin/categories/create">
          <kit-button>Создать</kit-button>
        </nuxt-link>
      </div>
      <kit-table class="table" :items="rows">
        <template #header>
          <div class="table--header">
            <app-table-section>
              Название
            </app-table-section>
          </div>
        </template>
        <template #default="{ id, name }">
          <nuxt-link class="table--item" :to="`categories/${id}`">
            <app-table-section>
              {{ name }}
            </app-table-section>
          </nuxt-link>
        </template>
      </kit-table>
    </div>
  </section>
</template>

<script>
import AppTableSection from '@/components/common/TableSection';
import utils from '@/utils';

export default {
  layout: 'admin',
  components: {
    AppTableSection
  },
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
.admin_page {
  &--cover {
    width: 100%;
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
}

.table {
  &--row {
    display: grid;
    grid-template-columns: 1fr;

    @media ($mobile) {
      padding: 6px 0;
      font-size: 14px;
    }
  }
}
</style>

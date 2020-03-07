<template>
  <section class="page container category">
    <div class="category--content">
      <kit-input v-model="category.name" placeholder="Название"/>
      <kit-tree-select
        v-model="category.parentId"
        :options="categories"
        placeholder="Категория"
      />
    </div>
    <div class="category--controls" @click="create">
      <kit-button>
        Создать
      </kit-button>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      category: {
        name: '',
        parentId: null
      },
      categories: []
    };
  },
  async asyncData({ app }) {
    const categories = await app.$api.categories.getList({
      hierarchy: true
    });
    return {
      categories
    };
  },
  methods: {
    async create() {
      try {
        this.$nuxt.$loading.start();
        await this.$api.categories.create(this.category);
        this.$alert.success('Категория создана');
        this.$router.push('/admin/categories');
      } catch (err) {
        this.$nuxt.$loading.finish();
        this.$alert.error(err.message);
      } finally {
        this.$nuxt.$loading.finish();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.category {
  &--content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;

    > * {
      width: 45%;
    }
  }

  &--controls {
    display: grid;
    grid-template-columns: 300px;
    justify-content: center;
    grid-area: controls;
  }
}
</style>

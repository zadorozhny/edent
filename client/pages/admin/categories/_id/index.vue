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
    <div class="category--controls">
      <kit-button @click="update">
        Изменить
      </kit-button>
      <kit-button type="warning" @click="modals.sure = true">
        Удалить
      </kit-button>
    </div>
    <kit-modal
      v-if="modals.sure"
      name="sure"
      @close="modals.sure = false"
    >
      <app-sure :title="'Вы уверены, что хотетите удалить категорию?'" @submit="remove"/>
    </kit-modal>
  </section>
</template>

<script>
import AppSure from '@/components/common/Sure';

export default {
  layout: 'admin',
  components: {
    AppSure
  },
  data() {
    return {
      modals: {
        sure: false
      },
      category: {
        id: null,
        name: '',
        parentId: null
      },
      categories: []
    };
  },
  async asyncData({ app, params }) {
    const [category, categories] = await Promise.all([
      app.$api.categories.get({ categoryId: params.id }),
      app.$api.categories.getList({
        hierarchy: true
      })
    ]);
    return {
      category,
      categories
    };
  },
  methods: {
    async update() {
      try {
        this.$nuxt.$loading.start();
        await this.$api.categories.update({
          categoryId: this.category.id,
          ...this.category
        });
        this.$alert.success('Категория обновлена');
        this.$router.push('/admin/categories');
      } catch (err) {
        this.$nuxt.$loading.finish();
        this.$alert.error(err.message);
      } finally {
        this.$nuxt.$loading.finish();
      }
    },
    async remove() {
      try {
        this.$nuxt.$loading.start();
        await this.$api.categories.remove({ categoryId: this.category.id });
        this.$alert.success('Категория удалена');
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
    grid-template-columns: 200px 200px;
    grid-column-gap: 30px;
    justify-content: center;
    grid-area: controls;
  }
}
</style>

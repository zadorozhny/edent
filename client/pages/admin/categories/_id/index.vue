<template>
  <section class="page container category">
    <div class="category--content">
      <kit-input
        v-model="category.name"
        :vuelidate="$v.category.name"
        placeholder="Название"
      />
      <kit-tree-select
        v-model="category.parentId"
        :vuelidate="$v.category.parentId"
        :options="categories"
        placeholder="Категория"
      />
    </div>
    <div class="category--controls">
      <kit-button class="category--button" :disabled="$v.category.$invalid" @click="update">
        Изменить
      </kit-button>
      <kit-button class="category--button" type="warning" @click="modals.sure = true">
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
import { details as schema } from '@/validations/category';
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
  validations: {
    category: schema
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
          name: this.category.name,
          parentId: this.category.parentId
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
    display: grid;
    margin-bottom: 40px;
    grid-template-columns: 1fr 1fr;
    column-gap: 10%;

    @media ($phablet) {
      grid-template-columns: 1fr;
      row-gap: 20px;
    }
  }

  &--controls {
    display: grid;
    grid-template-columns: 300px 300px;
    grid-column-gap: 30px;
    justify-content: center;

    @media ($phablet) {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 0;
    }
  }

  &--button {
    @media ($phablet) {
      border-radius: 0;
    }
  }
}
</style>

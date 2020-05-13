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
      <kit-button class="category--button" :disabled="$v.category.$invalid" @click="create">
        Создать
      </kit-button>
    </div>
  </section>
</template>

<script>
import { details as schema } from '@/validations/category';

export default {
  layout: 'admin',
  data() {
    return {
      category: {
        name: '',
        parentId: null
      }
    };
  },
  validations: {
    category: schema
  },
  computed: {
    categories() {
      return this.$store.state.common.categories;
    }
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
    grid-template-columns: 300px;
    justify-content: center;

    @media ($phablet) {
      grid-template-columns: 1fr;
    }
  }

  &--button {
    @media ($phablet) {
      border-radius: 0;
    }
  }
}
</style>

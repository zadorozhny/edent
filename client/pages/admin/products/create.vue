<template>
  <section class="page container product">
    <div class="product--image">
      <kit-image-uploader v-model="product.image"/>
    </div>
    <div class="product--content">
      <kit-input
        v-model="product.name"
        :vuelidate="$v.product.name"
        placeholder="Название"
      />
      <kit-tree-select
        v-model="product.categoryId"
        :vuelidate="$v.product.categoryId"
        :options="categories"
        placeholder="Категория"
      />
      <kit-select
        v-model="product.manufacturerId"
        :vuelidate="$v.product.manufacturerId"
        :options="manufacturers"
        placeholder="Производитель"
      />
      <kit-input
        v-model.number="product.price"
        :vuelidate="$v.product.price"
        :type="'number'"
        placeholder="Цена"
      />
    </div>
    <div class="product--description">
      <kit-textarea
        v-model="product.description"
        :vuelidate="$v.product.description"
        class="textarea"
        placeholder="Описание"
      />
    </div>
    <div class="product--controls">
      <kit-button class="product--button" :disabled="$v.product.$invalid" @click="create">
        Создать
      </kit-button>
    </div>
  </section>
</template>

<script>
import { details as schema } from '@/validations/product';

export default {
  layout: 'admin',
  data() {
    return {
      product: {
        image: 'https://bit.ly/2QDBhSA',
        name: '',
        price: null,
        categoryId: null,
        manufacturerId: null,
        description: ''
      },
      manufacturers: [],
      categories: []
    };
  },
  validations: {
    product: schema
  },
  async asyncData({ app }) {
    const [manufacturers, categories] = await Promise.all([
      app.$api.manufacturers.getList(),
      app.$api.categories.getList({
        hierarchy: true
      })
    ]);
    return {
      manufacturers,
      categories
    };
  },
  methods: {
    async create() {
      try {
        this.$nuxt.$loading.start();
        await this.$api.products.create(this.product);
        this.$alert.success('Товар создан');
        this.$router.push('/admin/products');
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
.product {
  display: grid;
  grid-template-columns: 50% calc(50% - 20px);
  grid-template-areas:
    "image content"
    "description description"
    "controls controls";
  grid-template-rows: 360px auto;
  grid-column-gap: 20px;
  grid-row-gap: 40px;

  @media ($phablet) {
    grid-template-columns: 100%;
    grid-template-rows: minmax(auto, 320px) auto auto auto;
    grid-row-gap: 20px;
    grid-template-areas:
      "image"
      "content"
      "description"
      "controls";
  }

  &--image {
    grid-area: image;
  }

  &--content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    grid-area: content;

    @media ($phablet) {
      & > * {
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  &--description {
    grid-area: description;
  }

  &--controls {
    display: grid;
    grid-template-columns: 300px;
    justify-content: center;
    grid-area: controls;

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

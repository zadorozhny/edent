<template>
  <section class="page container product">
    <div class="product--image">
      <kit-image-uploader v-model="product.image"/>
    </div>
    <div class="product--content">
      <kit-input v-model="product.name" placeholder="Название"/>
      <kit-tree-select
        v-model="product.categoryId"
        :options="categories"
        placeholder="Категория"
      />
      <kit-select
        v-model="product.manufacturerId"
        :options="manufacturers"
        placeholder="Производитель"
      />
      <kit-input v-model="product.price" :type="'number'" placeholder="Цена"/>
    </div>
    <div class="product--description">
      <textarea v-model="product.description" class="textarea" placeholder="Описание"/>
    </div>
    <div class="product--controls" @click="update">
      <kit-button>
        Изменить
      </kit-button>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      product: {
        id: null,
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
  async asyncData({ app, params }) {
    const [product, manufacturers, categories] = await Promise.all([
      app.$api.products.get({ productId: params.id }),
      app.$api.manufacturers.getList(),
      app.$api.categories.getList({
        hierarchy: true
      })
    ]);
    return {
      product: {
        ...product,
        categoryId: product.categories.pop().id
      },
      manufacturers,
      categories
    };
  },
  methods: {
    update() {
      try {
        this.$nuxt.$loading.start();
        this.$api.products.update({
          productId: this.product.id,
          ...this.product
        });
        this.$alert.success('Товар обновлен');
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

  &--image {
    grid-area: image;
  }

  &--content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    grid-area: content;
  }

  &--description {
    grid-area: description;
  }

  &--controls {
    display: grid;
    grid-template-columns: 300px;
    justify-content: center;
    grid-area: controls;
  }
}

.textarea {
  padding: 14px 10px;
  width: 100%;
  height: 200px;
  border: solid 1px #cfdbdf;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  resize: none;
  outline: none;
}
</style>

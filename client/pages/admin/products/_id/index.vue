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
      <kit-button class="product--button" :disabled="$v.product.$invalid" @click="update">
        Изменить
      </kit-button>
      <kit-button class="product--button" type="warning" @click="modals.sure = true">
        Удалить
      </kit-button>
    </div>
    <kit-modal
      v-if="modals.sure"
      name="sure"
      @close="modals.sure = false"
    >
      <app-sure :title="'Вы уверены, что хотетите удалить продукт?'" @submit="remove"/>
    </kit-modal>
  </section>
</template>

<script>
import { details as schema } from '@/validations/product';
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
      product: {
        id: null,
        image: 'https://bit.ly/2QDBhSA',
        name: '',
        price: null,
        categoryId: null,
        manufacturerId: null,
        description: ''
      }
    };
  },
  validations: {
    product: schema
  },
  computed: {
    manufacturers() {
      return this.$store.state.common.manufacturers;
    },
    categories() {
      return this.$store.state.common.categories;
    }
  },
  async asyncData({ app, params }) {
    const product = params.product || await app.$api.products.get({ productId: params.id });
    return {
      product: {
        ...product,
        categoryId: product.categories.pop().id
      }
    };
  },
  methods: {
    async update() {
      try {
        this.$nuxt.$loading.start();
        await this.$api.products.update({
          productId: this.product.id,
          image: this.product.image,
          name: this.product.name,
          price: this.product.price,
          categoryId: this.product.categoryId,
          manufacturerId: this.product.manufacturerId,
          description: this.product.description
        });
        this.$alert.success('Товар обновлен');
        this.$router.push('/admin/products');
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
        await this.$api.products.remove({ productId: this.product.id });
        this.$alert.success('Товар удален');
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
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "image content"
    "description description"
    "controls controls";
  grid-template-rows: 360px auto auto;
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
    grid-template-columns: 200px 200px;
    grid-column-gap: 30px;
    justify-content: center;
    grid-area: controls;

    @media ($phablet) {
      grid-column-gap: 0;
      grid-template-columns: 1fr 1fr;
    }
  }

  &--button {
    @media ($phablet) {
      border-radius: 0;
    }
  }
}
</style>

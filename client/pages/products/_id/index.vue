<template>
  <section class="page container container-no_space">
    <div class="product">
      <div class="product--picture">
        <img :src="product.image">
      </div>
      <div class="product--content">
        <div class="product--head">
          <h2 class="text_large">{{ product.name }}</h2>
          <span class="text_medium">#{{ product.id }}</span>
        </div>
        <div class="product--info">
          <p class="text_medium">Производитель: {{ product.manufacturer.name }}</p>
          <p class="text_medium">Категория: {{ product.category.name }}</p>
        </div>
        <div class="product--count">
          <button class="product--count_control" @click="count > 1 && (count -= 1)">
            -
          </button>
          <kit-input
            v-model.number="count"
            type="number"
            size="compact"
            class="product--count_input"
            placeholder="Колл."
            @blur="!count && (count = 1)"
          />
          <button class="product--count_control" @click="count += 1">
            +
          </button>
        </div>
        <p class="product--price text_title">Цена: <span class="text_large">₴{{ product.price }}</span></p>
      </div>
      <div class="product--buttons">
        <kit-button type="success" class="product--button" @click="buy">Купить</kit-button>
        <kit-button class="product--button" @click="add">В корзину</kit-button>
      </div>
      <p class="product--description text_medium">
        <span class="text_bold">Описание:</span> {{ product.description }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    product: {},
    count: 1
  }),
  async asyncData({ app, params }) {
    const product = params.product || await app.$api.products.get({ productId: params.id });
    const category = product.categories.reduce((prev, cur) => (prev.parentId > cur.parentId) ? prev : cur);
    return {
      product: {
        ...product,
        category
      }
    };
  },
  methods: {
    save() {
      const products = { ...this.$storage.products };
      if (products[this.product.id]) {
        products[this.product.id].count += this.count;
      } else {
        products[this.product.id] = { ...this.product, count: this.count };
      }
      this.$storage.products = products;
    },
    add() {
      this.save();
      this.$alert.success('Товар добавлен');
    },
    buy() {
      this.save();
      this.$router.push('/checkout');
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  display: grid;
  grid-template-columns: 50% calc(50% - 40px);
  grid-template-areas:
    "picture content"
    "picture buttons"
    "description description";
  grid-template-rows: auto 70px auto;
  grid-column-gap: 40px;
  grid-row-gap: 30px;

  @media ($phablet) {
    grid-template-columns: 100%;
    grid-template-rows: auto 260px auto auto;
    grid-column-gap: unset;
    grid-row-gap: 10px;
    grid-template-areas:
      "picture"
      "content"
      "description"
      "buttons";
  }

  &--picture {
    margin-right: 20px;
    width: 100%;
    height: 100%;
    max-height: 360px;
    grid-area: picture;
    box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;

    @media ($phablet) {
      width: 100%;
      border-radius: 0px;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &--content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-area: content;
    box-sizing: border-box;
    width: 100%;

    @media ($phablet) {
      padding: 10px;
    }
  }

  &--count {
    display: flex;
    align-items: center;

    &_control {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      font-size: 20px;
      border: none;
      border-radius: 5px;
      box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);
      background: #f7f9f8;
      cursor: pointer;
      transition: .25s ease-out;
      user-select: none;
      outline: none;

      &:hover {
        box-shadow: 0 0 4px 2px rgba(0, 0, 255, 0.15);
      }

      &:first-child {
        margin-right: 10px;
      }

      &:last-child {
        margin-left: 10px;
      }
    }

    &_input {
      width: 60px;
      text-align: center;
    }
  }

  &--description {
    grid-area: description;

    @media ($phablet) {
      padding: 10px;
    }
  }

  &--info {
    display: grid;
    grid-row-gap: 10px;
  }

  &--head {
    display: flex;
    justify-content: space-between;
  }

  &--buttons {
    display: flex;
    grid-area: buttons;
    align-items: flex-end;
    width: 100%;
  }

  &--button {
    &:first-child {
      margin-right: 20px;
    }

    @media ($phablet) {
      border-radius: 0;

      &:first-child {
        margin-right: 0;
      }
    }
  }
}
</style>

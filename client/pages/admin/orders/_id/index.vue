<template>
  <section class="page container order">
    <div class="order--content">
      <div class="order--group">
        <kit-select
          v-model="order.status"
          :options="statuses"
          placeholder="Статус"
        />
        <kit-input v-model="order.email" type="email" class="input" placeholder="Email"/>
        <kit-input
          v-model="order.phone"
          type="phone"
          class="input"
          placeholder="Телефон"
          mask="+{380} (00) 000-0000"
        />
        <kit-input v-model="order.name" type="text" class="input" placeholder="Имя"/>
      </div>
      <kit-label-group class="order--shipping_option">
        <kit-choice v-model="order.shipping" value="post" related>
          <kit-label type="outline" size="regular">Новая Почта</kit-label>
        </kit-choice>
        <kit-choice v-model="order.shipping" value="courier" related>
          <kit-label type="outline" size="regular">Курьер</kit-label>
        </kit-choice>
      </kit-label-group>
      <div class="order--group">
        <kit-input v-model="order.city" type="name" class="input" placeholder="Город"/>
        <kit-input
          v-model="order.address" type="number" class="input" placeholder="Номер отделения"
          :mask="Number"
        />
      </div>
      <kit-button @click="update">Изменить</kit-button>
    </div>
    <kit-table class="table" :items="order.products">
      <template #header>
        <div class="table--header">
          <div class="table--section">
            <span>Название</span>
          </div>
          <div class="table--section">
            <span>Цена</span>
          </div>
          <div class="table--section">
            <span>Количество</span>
          </div>
        </div>
      </template>
      <template #default="{ index, id, product, price, count, deleted }">
        <div :class="['table--item', { 'table--item-deleted': deleted }]">
          <div class="table--section">
            <span>{{ product.name }}</span>
          </div>
          <div class="table--section">
            <kit-input v-model.number="order.products[index].price" type="number" class="order--product_price"/>
            <span>{{ price * count }}</span>
          </div>
          <div class="table--section">
            <span class="table--control" @click="change(index, -1)">-</span>
            <span>{{ count }}</span>
            <span class="table--control" @click="change(index, 1)">+</span>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="table--footer">
          <span class="table--title">
            Сумма
          </span>
          <span class="table--total">
            ₴{{ total }}
          </span>
        </div>
      </template>
    </kit-table>
  </section>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      statuses: [
        { id: 'pending', name: 'В работе' },
        { id: 'finished', name: 'Завершен' },
        { id: 'closed', name: 'Отменен' }
      ],
      order: {
        id: null,
        email: '',
        phone: '',
        name: '',
        shipping: '',
        city: '',
        address: '',
        status: '',
        products: []
      }
    };
  },
  computed: {
    total() {
      return this.order.products.length
        ? this.order.products.reduce((sum, { count, price }) => sum + (price * count), 0)
        : 0;
    }
  },
  async asyncData({ app, params }) {
    const order = await app.$api.orders.get({ orderId: params.id });
    return {
      order
    };
  },
  methods: {
    change(index, value) {
      const product = this.order.products[index];
      if (product.count || value > 0) {
        product.count += value;

        if (!product.count) {
          product.deleted = true;
        }

        if (product.count && product.deleted) {
          product.deleted = false;
        }
      }
    },
    async update() {
      try {
        this.$nuxt.$loading.start();
        await this.$api.orders.update({
          orderId: this.order.id,
          ...this.order
        });
        this.$alert.success('Заказ изменен');
        this.$router.push('/admin/orders');
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
.order {
  display: grid;
  grid-template-columns: max(360px) 1fr;
  align-items: flex-start;
  column-gap: 60px;

  &--content {
    display: grid;
    row-gap: 35px;
  }

  &--group {
    display: grid;
    row-gap: 15px;
  }

  &--shipping_option {
    align-items: center;
  }

  &--product_price {
    margin-right: 20px;
    width: 70px;
  }
}

.table {
  &--header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 1fr 140px;
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
    grid-template-columns: minmax(0, 1fr) 1fr 140px;

    &-deleted {
      opacity: 0.4;
    }
  }

  &--footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 10px 10px;
  }

  &--title {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 600;
    color: #94979a;
  }

  &--total {
    font-size: 22px;
    font-weight: 600;
  }

  &--control {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    font-size: 20px;
    border-radius: 5px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);
    background: #f7f9f8;
    cursor: pointer;
    transition: .25s ease-out;
    user-select: none;

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
}
</style>

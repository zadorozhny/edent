<template>
  <section class="page container order">
    <div class="order--content">
      <div class="order--group">
        <kit-select
          v-model="order.status"
          :options="statuses"
          placeholder="Статус"
        />
        <kit-input
          v-model="order.email"
          :vuelidate="$v.order.email"
          type="email"
          class="input"
          placeholder="Email"
        />
        <kit-input
          v-model="order.phone"
          :vuelidate="$v.order.phone"
          type="tel"
          class="input"
          placeholder="Телефон"
          mask="+{380} (00) 000-0000"
        />
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
        <kit-input
          v-if="order.shipping === 'post'"
          v-model="order.fullName"
          :vuelidate="$v.order.fullName"
          class="input"
          placeholder="Ф.И.О"
        />
        <kit-input
          v-model="order.city"
          :vuelidate="$v.order.city"
          class="input"
          :disabled="order.shipping === 'courier'"
          placeholder="Город"
        />
        <kit-input
          v-model="order.address"
          :vuelidate="$v.order.address"
          class="input"
          :type="order.shipping === 'courier' ? 'string' : 'number'"
          :placeholder="order.shipping === 'courier' ? 'Адресс' : 'Номер отделения'"
        />
      </div>
      <div class="order--controls">
        <kit-button :disabled="$v.order.$invalid" @click="update">Изменить</kit-button>
        <kit-button type="warning" @click="modals.sure = true">
          Удалить
        </kit-button>
      </div>
    </div>
    <kit-table class="table" width="540px" :items="order.products">
      <template #header>
        <div class="table--row table--header">
          <app-table-section>
            Название
          </app-table-section>
          <app-table-section>
            Цена (один/сумма)
          </app-table-section>
          <app-table-section>
            Количество
          </app-table-section>
        </div>
      </template>
      <template #default="{ index, id, product, price, count, deleted }">
        <div :class="['table--row', 'table--item', { 'table--item-deleted': deleted }]">
          <app-table-section>
            {{ product.name }}
          </app-table-section>
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
          <div class="table--append">
            <kit-input
              v-model.number="productId"
              type="number"
              class="table--product_number"
              placeholder="№ Товара"
            />
            <button class="table--add_product" @click="add">
              Добавить товар
            </button>
          </div>
          <div class="table--total">
            <span class="table--title">
              Сумма
            </span>
            <span class="table--total_price">
              ₴{{ total }}
            </span>
          </div>
        </div>
      </template>
    </kit-table>
    <kit-modal
      v-if="modals.sure"
      name="sure"
      @close="modals.sure = false"
    >
      <app-sure :title="'Вы уверены, что хотетите удалить заказ?'" @submit="remove"/>
    </kit-modal>
  </section>
</template>

<script>
import { details as schema } from '@/validations/order';
import AppSure from '@/components/common/Sure';
import AppTableSection from '@/components/common/TableSection';

export default {
  layout: 'admin',
  components: {
    AppSure,
    AppTableSection
  },
  data() {
    return {
      modals: {
        sure: false
      },
      statuses: [
        { id: 'pending', name: 'В работе' },
        { id: 'finished', name: 'Завершен' },
        { id: 'closed', name: 'Отменен' }
      ],
      productId: null,
      order: {
        id: null,
        email: '',
        phone: '',
        shipping: '',
        city: '',
        address: '',
        status: '',
        products: []
      }
    };
  },
  validations: {
    order: schema
  },
  computed: {
    total() {
      return this.order.products.length
        ? this.order.products.reduce((sum, { count, price }) => sum + (price * count), 0)
        : 0;
    }
  },
  watch: {
    'order.shipping': function (value) {
      if (value === 'courier') {
        this.order.city = 'Харьков';
        this.order.address = '';
      } else {
        this.order.city = '';
        this.order.address = '';
      }
    }
  },
  async asyncData({ app, params }) {
    const order = params.order || await app.$api.orders.get({ orderId: params.id });
    return {
      order
    };
  },
  methods: {
    async add() {
      try {
        this.$nuxt.$loading.start();
        const existed = this.order.products.find(item => item.product.id === this.productId);
        if (existed) {
          existed.count += 1;
          return;
        }
        const product = await this.$api.products.get({ productId: this.productId });
        if (!product) {
          this.$alert.error('Продукт не найден');
          return;
        }
        this.order.products.push({ price: product.price, product, count: 1 });
      } catch (err) {
        this.$nuxt.$loading.finish();
        this.$alert.error(err.message);
      } finally {
        this.$nuxt.$loading.finish();
      }
    },
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
          status: this.order.status,
          email: this.order.email,
          phone: this.order.phone,
          shipping: this.order.shipping,
          fullName: this.order.fullName,
          city: this.order.city,
          address: this.order.address,
          products: this.order.products.map(({ product, price, count, deleted }) => ({
            id: product.id,
            price,
            count,
            deleted
          }))
        });
        this.$alert.success('Заказ изменен');
        this.$router.push('/admin/orders');
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
        await this.$api.orders.remove({ orderId: this.order.id });
        this.$alert.success('Заказ удален');
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

  @media ($phablet) {
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 40px;
  }

  &--content {
    display: grid;
    row-gap: 35px;

    @media ($phablet) {
      order: 2;
    }
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

  &--controls {
    display: grid;
    grid-template-columns: 170px 170px;
    justify-content: space-between;

    @media ($phablet) {
      grid-template-columns: 1fr 1fr;

      & > * {
        border-radius: 0;
      }
    }
  }
}

.table {
  @media ($phablet) {
    order: 1;
  }
  &--row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 1fr 140px;
  }

  &--section {
    display: flex;
    align-items: center;
    padding: 15px 10px;
  }

  &--item {
    &-deleted {
      opacity: 0.4;
    }
  }

  &--footer {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
  }

  &--append {
    display: flex;
    align-items: center;
  }

  &--product_number {
    margin-right: 10px;
  }

  &--title {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 600;
    color: #94979a;
  }

  &--total {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &--total_price {
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

  &--add_product {
    padding: 15px;
    border: none;
    border-radius: 50px;
    background-color: $light;
    box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);
    outline: none;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 4px 2px rgba(0, 0, 255, 0.15);
    }
  }

  &--product_number {
    width: 110px;
  }
}
</style>

<template>
  <div class="page container checkout">
    <div class="checkout--content">
      <div class="checkout--group">
        <kit-input
          v-model="order.phone"
          :vuelidate="$v.order.phone"
          type="tel"
          class="input"
          placeholder="Телефон"
          mask="+{380} (00) 000-0000"
        />
        <kit-input
          v-model="order.email"
          :vuelidate="$v.order.email"
          type="email"
          class="input"
          placeholder="Email"
        />
      </div>
      <kit-label-group class="checkout--shipping_option">
        <kit-choice v-model="order.shipping" value="post" related>
          <kit-label type="outline" size="regular">Новая Почта</kit-label>
        </kit-choice>
        <kit-choice v-model="order.shipping" value="courier" related>
          <kit-label type="outline" size="regular">Курьер</kit-label>
        </kit-choice>
      </kit-label-group>
      <div class="checkout--group">
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
      <kit-button :disabled="$v.order.$invalid" @click="create">Заказать</kit-button>
    </div>
    <kit-table class="table" :items="products">
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
      <template #default="{ id, name, price, count }">
        <div class="table--item">
          <div class="table--section">
            <span>{{ name }}</span>
          </div>
          <div class="table--section">
            <span>{{ price * count }}</span>
          </div>
          <div class="table--section">
            <span class="table--control" @click="change(id, -1)">-</span>
            <span>{{ count }}</span>
            <span class="table--control" @click="change(id, 1)">+</span>
          </div>
        </div>
      </template>
      <template v-if="!products.length" #placeholder>
        <div class="table--placeholder">
          Нет товара
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
  </div>
</template>

<script>
import { details as schema } from '@/validations/order';

export default {
  data: () => ({
    order: {
      email: '',
      phone: '',
      shipping: 'post',
      fullName: '',
      city: '',
      address: ''
    }
  }),
  validations: {
    order: schema
  },
  computed: {
    products() {
      return this.$storage && this.$storage.products ? Object.values(this.$storage.products) : [];
    },
    total() {
      return this.products.length ? this.products.reduce((sum, { count, price }) => sum + (price * count), 0) : 0;
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
  methods: {
    change(key, value) {
      const products = { ...this.$storage.products };
      if (products[key].count === 1 && value === -1) {
        delete products[key];
      } else {
        products[key] = { ...products[key], count: products[key].count + value };
      }
      this.$storage.products = products;
    },
    async create() {
      try {
        this.$nuxt.$loading.start();
        if (!this.products.length) {
          this.$alert.error('Нет добавленного товара');
          return;
        }
        await this.$api.orders.create({
          email: this.order.email,
          phone: this.order.phone,
          shipping: this.order.shipping,
          fullName: this.order.fullName,
          city: this.order.city,
          address: this.order.address,
          products: this.products.map(({ id, price, count }) => ({
            id,
            price,
            count
          }))
        });
        this.$alert.success('Заказ создан');
        this.$storage.products = {};
        this.$router.push('/products');
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
.checkout {
  display: grid;
  grid-template-columns: max(360px) 1fr;
  align-items: flex-start;
  column-gap: 60px;

  @media ($tablet) {
    grid-template-columns: max(280px) 1fr;
    column-gap: 20px;
  }

  @media ($phablet) {
    grid-template-columns: 1fr;
    column-gap: unset;
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
}

.table {
  @media ($phablet) {
    order: 1;
    margin-bottom: 30px;
  }

  @media ($mobile) {
    padding: 0;
  }

  &--header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 1fr 140px;

    @media ($tablet) {
      grid-template-columns: minmax(0, 1fr) 100px 135px;
    }

    @media ($mobile) {
      grid-template-columns: minmax(0, 1fr) 80px 110px;
      padding: 6px 0;
      font-size: 14px;
    }
  }

  &--section {
    display: flex;
    align-items: center;
    padding: 15px 10px;

    @media ($mobile) {
      padding: 10px 5px;
    }

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &--item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 1fr 140px;

    @media ($tablet) {
      grid-template-columns: minmax(0, 1fr) 100px 135px;
    }

    @media ($mobile) {
      font-size: 14px;
      grid-template-columns: minmax(0, 1fr) 80px 110px;
    }
  }

  &--placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 10px;
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

    @media ($mobile) {
      font-size: 14px;
    }
  }

  &--total {
    font-size: 22px;
    font-weight: 600;

    @media ($mobile) {
      font-size: 20px;
    }
  }

  &--control {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);
    background: #f7f9f8;
    cursor: pointer;
    transition: .25s ease-out;
    user-select: none;

    @media ($mobile) {
      width: 30px;
      height: 30px;
    }

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

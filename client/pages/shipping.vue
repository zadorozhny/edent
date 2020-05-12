<template>
  <div class="page container shipping">
    <div class="shipping--content shipping--ukraine_content">
      <h2 class="shipping--title text_title">Украина</h2>
      <p class="shipping--option">
        <kit-icon :ripple="false" class="shipping--icon">local_post_office</kit-icon>
        Доставка Новой Почтой
      </p>
      <p class="shipping--option">
        <kit-icon :ripple="false" class="shipping--icon">account_balance_wallet</kit-icon>
        <span>
          <span class="shipping--paragraph shipping--paragraph-space">Оплата осуществляется:</span>
          <span class="shipping--paragraph">- наложенным платежём</span>
          <span class="shipping--paragraph shipping--paragraph-space">- перечислением на карту</span>
          <span class="shipping--paragraph">* обязательная предоплата в размере двух доставок</span>
        </span>
      </p>
      <p class="shipping--option">
        <kit-icon :ripple="false" class="shipping--icon">warning</kit-icon>
        За заказ меньше {{ price }} грн к сумме заказа добавляется стоимость доставки (от 50 грн)
      </p>
      <p class="shipping--option">
        <kit-icon :ripple="false" class="shipping--icon">announcement</kit-icon>
        За заказ свыше {{ price }} грн доставка БЕСПЛАТНО
      </p>
    </div>
    <div class="shipping--image_wrapper shipping--ukraine_image">
      <img class="shipping--image shipping--image-ukraine" src="~assets/images/ukraine.svg">
    </div>
    <div class="shipping--content shipping--kharkiv_content">
      <h2 class="shipping--title text_title">Харьков</h2>
      <p class="shipping--option">
        <kit-icon :ripple="false" class="shipping--icon">local_post_office</kit-icon>
        Доставка Новой Почтой
      </p>
      <p class="shipping--option">
        <kit-icon :ripple="false" class="shipping--icon">local_shipping</kit-icon>
        Доставка курьером (от 50 грн)
      </p>
      <p class="shipping--option">
        <kit-icon :ripple="false" class="shipping--icon">account_balance_wallet</kit-icon>
        <span>
          <span class="shipping--paragraph shipping--paragraph-space">Оплата осуществляется:</span>
          <span class="shipping--paragraph">- наложенным платежём</span>
          <span class="shipping--paragraph shipping--paragraph-space">- перечислением на карту</span>
          <span class="shipping--paragraph">* обязательная предоплата в размере двух доставок</span>
        </span>
      </p>
      <p class="shipping--option">
        <kit-icon :ripple="false" class="shipping--icon">warning</kit-icon>
        За заказ меньше {{ price }} грн к сумме заказа добавляется стоимость доставки (от 50 грн)
      </p>
      <p class="shipping--option">
        <kit-icon :ripple="false" class="shipping--icon">announcement</kit-icon>
        За заказ свыше {{ price }} грн доставка БЕСПЛАТНО
      </p>
    </div>
    <div class="shipping--image_wrapper shipping--kharkiv_image">
      <img class="shipping--image shipping--image-kharkiv" src="~assets/images/kharkiv.svg">
    </div>
  </div>
</template>

<script>
import { FREE_SHIPPING_PRICE } from '@/config/index';

export default {
  data: () => ({
    price: FREE_SHIPPING_PRICE
  })
};
</script>

<style lang="scss" scoped>
.shipping {
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "ukraine_content kharkiv_content"
    "ukraine_image kharkiv_image";
  row-gap: 40px;
  column-gap: 60px;
  padding: 40px 10px;

  @media ($tablet) {
    padding: 10px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      "ukraine_content"
      "ukraine_image"
      "kharkiv_content"
      "kharkiv_image";
  }

  &--content {
    padding: 10px;
    max-width: 460px;
    width: 100%;
    border-radius: 3px;
    box-sizing: border-box;
    box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);
    background: $light;

    &:hover {
      box-shadow: 0 0 4px 2px rgba(0, 0, 255, 0.15);
    }
  }

  &--ukraine_content {
    grid-area: ukraine_content;
  }

  &--kharkiv_content {
    grid-area: kharkiv_content;
  }

  &--title {
    margin-bottom: 15px;
    font-size: 18px;
    text-align: center;
  }

  &--icon {
    margin-right: 5px;
    min-width: 40px;
  }

  &--option {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &--paragraph {
    display: block;

    &-space {
      margin-bottom: 5px;
    }
  }

  &--image_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-area: image;
  }

  &--ukraine_image {
    grid-area: ukraine_image;
  }

  &--kharkiv_image {
    grid-area: kharkiv_image;
  }

  &--image {
    max-height: 300px;
    width: 100%;
    object-fit: contain;
    fill: $main;
    transition: .25s ease-out;
    pointer-events: none;
    user-select: none;
  }
}
</style>

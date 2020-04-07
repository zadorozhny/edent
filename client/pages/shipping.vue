<template>
  <div class="page container shipping">
    <div class="shipping--content">
      <div class="shipping--information">
        <h2 class="shipping--title">Украина</h2>
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
            <span class="shipping--paragraph">*Обязательная предоплата в размере двух доставок</span>
          </span>
        </p>
        <p class="shipping--option">
          <kit-icon :ripple="false" class="shipping--icon">warning</kit-icon>
          За заказ меньше 1000 грн к сумме заказа добавляется стоимость доставки (от 50 грн)
        </p>
        <p class="shipping--option">
          <kit-icon :ripple="false" class="shipping--icon">announcement</kit-icon>
          За заказ свыше 1000 грн доставка БЕСПЛАТНО
        </p>
      </div>
      <div class="shipping--image_wrapper">
        <img class="shipping--image shipping--image-ukraine" src="~assets/images/ukraine.svg">
      </div>
    </div>
    <div class="shipping--content">
      <div class="shipping--information">
        <h2 class="shipping--title">Харьков</h2>
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
            <span class="shipping--paragraph">*Обязательная предоплата в размере двух доставок</span>
          </span>
        </p>
        <p class="shipping--option">
          <kit-icon :ripple="false" class="shipping--icon">warning</kit-icon>
          За заказ меньше 1000 грн к сумме заказа добавляется стоимость доставки (от 50 грн)
        </p>
        <p class="shipping--option">
          <kit-icon :ripple="false" class="shipping--icon">announcement</kit-icon>
          За заказ свыше 1000 грн доставка БЕСПЛАТНО
        </p>
      </div>
      <div class="shipping--image_wrapper">
        <img class="shipping--image shipping--image-kharkiv" src="~assets/images/kharkiv.svg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style lang="scss" scoped>
.shipping {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 60px;
  padding: 40px 10px;

  @media ($tablet) {
    padding: 10px;
    grid-template-columns: 1fr;
  }

  &--content {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ($tablet) {
      margin-bottom: 40px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &:hover {
      .shipping--information {
        box-shadow: 0 0 4px 2px rgba(0, 0, 255, 0.15);
      }
    }
  }

  &--information {
    padding: 10px;
    margin-bottom: 40px;
    max-width: 460px;
    width: 100%;
    border-radius: 3px;
    box-sizing: border-box;
    box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);
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

<template>
  <div class="page container container-space checkout">
    <div class="checkout--content">
      <div class="checkout--group">
        <kit-input type="email" class="input" placeholder="Email"/>
        <kit-input v-model="phone" type="phone" class="input" mask="+{380} (00) 000-0000"/>
        <kit-input type="text" class="input" placeholder="Имя"/>
      </div>
      <kit-label-group>
        <kit-choice v-model="option" value="ex" related>
          <kit-label type="outline" size="regular">Новая Почта</kit-label>
        </kit-choice>
        <kit-choice v-model="option" value="ch" related>
          <kit-label type="outline" size="regular">Курьер</kit-label>
        </kit-choice>
      </kit-label-group>
      <div class="checkout--group">
        <kit-input type="name" class="input" placeholder="Город"/>
        <kit-input type="number" class="input" placeholder="Номер отделения" :mask="Number"/>
      </div>
      <kit-button position="bottom">Заказать</kit-button>
    </div>
    <div class="checkout--items">
      <div class="checkout--table items">
        <div class="items--header">
          <div class="items--section">
            <span>Название</span>
          </div>
          <div class="items--section">
            <span>Цена</span>
          </div>
          <div class="items--section">
            <span>Количество</span>
          </div>
        </div>
        <div class="items--item">
          <div class="items--section">
            <span>Даймондбрайт</span>
          </div>
          <div class="items--section">
            <span>₴1299</span>
          </div>
          <div class="items--section">
            <span class="items--control">-</span>
            <span>2</span>
            <span class="items--control">+</span>
          </div>
        </div>
        <div class="items--item">
          <div class="items--section">
            <span>Даймондбрайт</span>
          </div>
          <div class="items--section">
            <span>₴1299</span>
          </div>
          <div class="items--section">
            <span class="items--control">-</span>
            <span>2</span>
            <span class="items--control">+</span>
          </div>
        </div>
        <div class="items--item">
          <div class="items--section">
            <span>Даймондбрайт</span>
          </div>
          <div class="items--section">
            <span>₴1299</span>
          </div>
          <div class="items--section">
            <span class="items--control">-</span>
            <span>2</span>
            <span class="items--control">+</span>
          </div>
        </div>
        <div class="items--footer">
          <span class="items--title">
            Сумма
          </span>
          <span class="items--total">
            ₴4367
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    option: null,
    phone: ''
  })
};
</script>

<style lang="scss" scoped>
.checkout {
  display: grid;
  grid-template-columns: max(360px) 1fr;
  column-gap: 60px;

  @media ($tablet) {
    grid-template-columns: max(280px) 1fr;
    column-gap: 20px;
  }

  @media ($phablet) {
    grid-template-columns: 1fr;
    column-gap: unset;
    margin-bottom: 54px;
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

  &--table {
    margin: 0 auto;
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box;
    background: $light;
    box-shadow: 0 0 4px 3px rgba(0, 0, 255, 0.1);
    overflow: hidden;

    @media ($phablet) {
      order: 1;
      margin-bottom: 30px;
    }
  }
}

.items {
  padding: 5px;

  @media ($mobile) {
    padding: 0;
  }

  &--header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 1fr 140px;
    color: #94979a;
    font-size: 16px;
    font-weight: 600;
    background: #f7f9f8;

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
    font-size: 16px;
    font-weight: 600;
    border-bottom: solid 1px $border;

    @media ($tablet) {
      grid-template-columns: minmax(0, 1fr) 100px 135px;
    }

    @media ($mobile) {
      font-size: 14px;
      grid-template-columns: minmax(0, 1fr) 80px 110px;
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
    border-radius: 5px;
    box-shadow: 0 0 4px 3px rgba(0, 0, 255, 0.1);
    background: #f7f9f8;
    cursor: pointer;
    transition: .25s ease-out;
    user-select: none;

    @media ($mobile) {
      width: 30px;
      height: 30px;
    }

    &:hover {
      box-shadow: 0 0 8px 3px rgba(0, 0, 255, 0.2);
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

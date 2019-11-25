<template>
  <section class="page container">
    <div class="product">
      <div class="product--picture">
        <img :src="value">
      </div>
      <div class="product--content">
        <div class="product--head">
          <h2 class="text_large">Даймондбрайт</h2>
          <span class="text_medium">#132</span>
        </div>
        <div class="product--info">
          <p class="text_medium">Модель: CKD000340</p>
          <p class="text_medium">Производитель: Cerkamed</p>
        </div>
        <p class="product--price text_title">Цена: <span class="text_large">1299</span></p>
        <div class="buttons">
          <kit-button type="success" class="button">Купить</kit-button>
          <kit-button class="button">В корзину</kit-button>
        </div>
      </div>
      <p class="product--description text_medium">
        <span class="text_bold">Описание:</span> Сайт рыбатекст поможет дизайнеру, верстальщику,
        вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке,
        а начинающему оратору отточить навык публичных выступлений в домашних условиях.
        При создании генератора мы использовали небезизвестный универсальный код речей.
        Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце,
        что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    value: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
  })
};
</script>

<style lang="scss" scoped>
.product {
  display: grid;
  grid-template-columns: 50% calc(50% - 20px);
  grid-template-areas:
    "picture content"
    "description description";
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  @media ($phablet) {
    margin-bottom: 54px;
    grid-template-columns: 100%;
    grid-template-rows: auto 200px auto;
    grid-column-gap: unset;
    grid-row-gap: 10px;
    grid-template-areas:
      "picture picture"
      "content content"
      "description description";
  }

  &--picture {
    margin-right: 20px;
    width: 100%;
    grid-area: picture;
    box-shadow: 0px 1px 4px 0 rgba(0,0,0,0.3);
    border-radius: 3px;
    overflow: hidden;

    @media ($phablet) {
      width: 100%;
      border-radius: 0px;
    }

    img {
      display: block;
      width: 100%;
      object-fit: cover;
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
}

.buttons {
  display: flex;
  width: 100%;

  @media ($phablet) {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
  }
}

.button {
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
</style>

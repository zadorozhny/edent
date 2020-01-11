<template>
  <section class="page container container-no_space">
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
        <p class="product--price text_title">Цена: <span class="text_large">₴1299</span></p>
      </div>
      <div class="buttons">
        <kit-button type="success" class="button">Купить</kit-button>
        <kit-button class="button">В корзину</kit-button>
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
    value: 'https://bit.ly/2QDBhSA'
  })
};
</script>

<style lang="scss" scoped>
.product {
  display: grid;
  grid-template-columns: 50% calc(50% - 20px);
  grid-template-areas:
    "picture content"
    "picture buttons"
    "description description";
  grid-template-rows: auto 120px auto;
  grid-column-gap: 20px;
  grid-row-gap: 30px;

  @media ($phablet) {
    grid-template-columns: 100%;
    grid-template-rows: auto 200px auto;
    grid-column-gap: unset;
    grid-row-gap: 10px;
    grid-template-areas:
      "picture picture"
      "content content"
      "description description"
      "buttons buttons";
  }

  &--picture {
    margin-right: 20px;
    width: 100%;
    height: 100%;
    max-height: 360px;
    grid-area: picture;
    box-shadow: 0 0 4px 3px rgba(0, 0, 255, 0.1);
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
  grid-area: buttons;
  align-items: flex-end;
  width: 100%;
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

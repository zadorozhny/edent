<template>
  <section class="container">
    <div class="product">
      <div class="picture">
        <img :src="value">
      </div>
      <div class="content">
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <p>Lorem Ipsum</p>
        <div class="buttons">
          <kit-button type="success" class="button">Купить</kit-button>
          <kit-button class="button">В корзину</kit-button>
        </div>
      </div>
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
  display: flex;
  align-items: flex-start;

  @media ($phablet) {
    flex-direction: column;
    margin-bottom: 44px;
  }
}

.content {
  width: 50%;

  @media ($phablet) {
    padding: 10px;
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

.picture {
  margin-right: 20px;
  width: 50%;
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
</style>

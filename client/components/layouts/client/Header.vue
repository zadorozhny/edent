<template>
  <nav class="navigation">
    <div class="navigation--wrapper">
      <nuxt-link tag="div" to="/products" class="navigation--logo">
        <img class="navigation--image" src="~assets/images/logo.svg">
        <h1 class="navigation--title">edent</h1>
      </nuxt-link>
      <ul class="navigation--list">
        <nuxt-link tag="li" to="/products" class="navigation--item">
          <span>Товары</span>
        </nuxt-link>
        <nuxt-link tag="li" to="/shipping" class="navigation--item">
          <span>Доставка и Оплата</span>
        </nuxt-link>
        <nuxt-link tag="li" to="/contacts" class="navigation--item">
          <span>Контакты</span>
        </nuxt-link>
      </ul>
      <div class="search">
        <kit-input type="search" size="compact" placeholder="Поиск" @input="search"/>
      </div>
      <div class="navigation--controls">
        <nuxt-link to="/checkout" class="navigation--cart">
          <kit-icon>
            shopping_cart
          </kit-icon>
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    search(e) {
      this.$event.$emit('search', e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  height: 36px;
  width: 340px;

  @media ($tablet) {
    order: 2;
    width: 100%;
    height: 34px;
  }
}

.input {
  padding: 7px 15px;
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: solid 1px #e6e6e6;
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
  border: solid 1px #dfe1e5;
  transition: .25s ease-out;
  cursor: pointer;
}

.navigation {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 0 4px 3px rgba(0, 0, 255, 0.1);
  background: $light;
  z-index: 10;

  &--wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin: 0 auto;
    max-width: 1250px;
    width: 100%;
    height: $desktop-navigation;
    box-sizing: border-box;

    @media ($tablet) {
      align-items: unset;
      flex-wrap: wrap;
      padding: 0 10px;
      height: $mobile-navigation;
    }
  }

  &--logo {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &--image {
    width: 40px;
    height: 40px;

    @media ($tablet) {
      width: 36px;
      height: 36px;
    }
  }

  &--title {
    margin-left: 7px;
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
  }

  &--list {
    display: flex;
    align-items: center;
    height: 100%;

    @media ($tablet) {
      display: none;
    }
  }

  &--item {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 15px;
    box-sizing: border-box;
    cursor: pointer;

    &.exact-active-link {
      &::after {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 3px;
        background: $main;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &--avatar {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    padding: 3px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background: $main;
    transition: .25s ease-out;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;

    @media ($tablet) {
      width: 36px;
      height: 36px;
    }

    &:hover {
      &::after {
        display: block;
        position: absolute;
        top: -3px;
        left: -3px;
        content: '';
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: #f0f0f0;
        z-index: -1;
      }
    }
  }

  &--letters {
    font-size: 18px;

    @media ($tablet) {
      font-size: 16px;
    }
  }

  &--controls {
    display: flex;
    align-items: center;
  }
}


</style>

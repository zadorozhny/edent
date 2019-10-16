<template>
  <div class="layout">
    <nav class="navigation">
      <div class="navigation--wrapper">
        <nuxt-link tag="div" to="/" class="navigation--logo">
          <img class="navigation--image" src="~assets/images/logo.svg">
          <h1 class="navigation--title">edent</h1>
        </nuxt-link>
        <ul class="navigation--list">
          <nuxt-link tag="li" to="/" class="navigation--item">
            <span>Главная</span>
          </nuxt-link>
          <nuxt-link tag="li" to="/products" class="navigation--item">
            <span>Товары</span>
          </nuxt-link>
          <nuxt-link tag="li" to="/shipping" class="navigation--item">
            <span>Доставка</span>
          </nuxt-link>
          <nuxt-link tag="li" to="/contacts" class="navigation--item">
            <span>Контакты</span>
          </nuxt-link>
        </ul>
        <div class="navigation--controls">
          <kit-icon class="navigation--cart">
            shopping_cart
          </kit-icon>
          <div class="navigation--avatar ripple">
            <span class="navigation--letters">АЗ</span>
          </div>
        </div>
      </div>
    </nav>
    <nuxt/>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
}

.navigation {
  min-height: 62px;
  box-shadow: 0px 1px 4px 0 rgba(0,0,0,0.3);
  z-index: 10;

  &--wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin: 0 auto;
    max-width: 1250px;
    width: 100%;
    box-sizing: border-box;
  }

  &--logo {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &--image {
    width: 40px;
    height: 40px;
  }

  &--title {
    margin-left: 7px;
    font-weight: 300;
    text-transform: uppercase;
  }

  &--list {
    display: flex;
    align-items: center;
    height: 62px;
  }

  &--item {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 10px;
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
    font-size: 16px;
  }

  &--controls {
    display: flex;
    align-items: center;
  }

  &--cart {
    margin-right: 5px;
  }
}

.container {
  padding: 10px 20px;
  overflow: auto;
}
</style>

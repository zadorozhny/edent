<template>
  <nav class="navigation">
    <div class="navigation--wrapper">
      <div class="navigation--main">
        <kit-icon
          v-if="$mq !== 'desktop'"
          @click="$emit('navigation')"
        >
          menu
        </kit-icon>
        <nuxt-link tag="div" to="/products" class="navigation--logo">
          <img class="navigation--image" src="~assets/images/logo.svg">
          <h1 class="navigation--title">edent</h1>
        </nuxt-link>
      </div>
      <ul class="navigation--list">
        <nuxt-link tag="li" to="/admin/products" class="navigation--item">
          <span>Товары</span>
        </nuxt-link>
        <nuxt-link tag="li" to="/admin/orders" class="navigation--item">
          <span>Заказы</span>
        </nuxt-link>
        <nuxt-link tag="li" to="/admin/categories" class="navigation--item">
          <span>Категории</span>
        </nuxt-link>
        <nuxt-link tag="li" to="/admin/manufacturers" class="navigation--item">
          <span>Производители</span>
        </nuxt-link>
        <nuxt-link tag="li" to="/admin/warning" class="navigation--item">
          <span>Баннер</span>
        </nuxt-link>
      </ul>
      <div class="navigation--controls">
        <div class="navigation--avatar ripple">
          <span class="navigation--letters">{{ name || '-' }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    name() {
      return this.$store.state.auth.profile.name.charAt(0);
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);
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
      padding: 0 10px;
    }
  }

  &--main {
    display: flex;
    align-items: center;
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
      display: none;
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
    font-size: 18px;
  }
}
</style>

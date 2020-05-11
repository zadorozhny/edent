<template>
  <nav class="navigation">
    <div :class="['navigation--wrapper', { 'navigation--wrapper-large': products }]">
      <div class="navigation--links">
        <div class="navigation--main">
          <kit-icon
            v-if="$mq !== 'desktop'"
            @click="$emit('navigation')"
          >
            menu
          </kit-icon>
          <nuxt-link tag="div" to="/products" class="navigation--logo">
            <img v-if="$mq === 'desktop'" class="navigation--image" src="~assets/images/logo.svg">
            <h1 class="navigation--title text_title">edent</h1>
          </nuxt-link>
        </div>
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
      </div>
      <div v-if="products" class="filters">
        <kit-input
          class="filters--input"
          type="search"
          size="compact"
          placeholder="Поиск"
          @input="search"
        />
        <div class="filters--icon" @click="showFilter">
          <kit-icon>
            filter_list
          </kit-icon>
        </div>
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
  data() {
    return {
      products: null
    };
  },
  watch: {
    '$route.path': {
      handler() {
        this.products = this.$router.currentRoute.name === 'products';
      },
      immediate: true
    }
  },
  methods: {
    search(e) {
      this.$event.$emit('search', e.target.value);
    },
    showFilter() {
      this.$event.$emit('show_filter');
    }
  }
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  height: 40px;
  width: 340px;

  &--icon {
    display: none;
  }

  &--input {
    width: 100%;
  }

  @media ($tablet) {
    order: 2;
    width: 100%;
    height: 40px;

    &--icon {
      display: block;
      margin-left: 10px;
    }
  }
}

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
      align-items: unset;
      flex-wrap: wrap;
      padding: 0 10px;
      height: $mobile-navigation;
    }

    &-large {
      @media ($tablet) {
        align-items: unset;
        flex-wrap: wrap;
        padding: 0 10px;
        height: $mobile-navigation-large;
      }
    }
  }

  &--main {
    display: flex;
    align-items: center;
  }

  &--links {
    display: flex;
    height: 100%;

    @media ($tablet) {
      height: auto;
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
    font-weight: 600;
    line-height: 0.8;
    text-transform: uppercase;
  }

  &--list {
    display: flex;
    align-items: center;
    margin-left: 80px;
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

  &--controls {
    display: flex;
    align-items: center;
  }
}


</style>

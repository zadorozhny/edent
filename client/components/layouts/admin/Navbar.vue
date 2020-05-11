<template>
  <div class="navbar">
    <div class="navbar--header">
      <nuxt-link to="/">
        <img src="~assets/images/logo.svg" alt="Edent" class="navbar--logo">
      </nuxt-link>
      <kit-icon class="navbar--close" @click="$emit('close')">
        close
      </kit-icon>
    </div>
    <nav class="navbar--navigation navigation">
      <ul class="navigation--list text_medium">
        <li class="navigation--item">
          <nuxt-link to="/admin/products" class="navigation--link">
            <span>Товары</span>
          </nuxt-link>
        </li>
        <li class="navigation--item">
          <nuxt-link to="/admin/orders" class="navigation--link">
            <span>Заказы</span>
          </nuxt-link>
        </li>
        <li class="navigation--item">
          <nuxt-link to="/admin/categories" class="navigation--link">
            <span>Категории</span>
          </nuxt-link>
        </li>
        <li class="navigation--item">
          <nuxt-link to="/admin/manufacturers" class="navigation--link">
            <span>Поизводители</span>
          </nuxt-link>
        </li>
        <li class="navigation--item">
          <nuxt-link to="/admin/warning" class="navigation--link">
            <span>Баннер</span>
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { contacts } from '@/config';
import kyivstar from '@/assets/images/kyivstar.png';
import vodafone from '@/assets/images/vodafone.png';

export default {
  computed: {
    contacts() {
      return contacts;
    },
    icons() {
      return {
        kyivstar,
        vodafone
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: $dark;
  color: $light;
  box-sizing: border-box;
  overflow: auto;

  &--header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 10px 60px;

    @media ($tablet) {
      margin: 20px 10px;
    }
  }

  &--logo {
    display: flex;
    height: 50px;
    padding-top: 7px;
  }

  &--close {
    position: absolute;
    right: 0;
  }

  &--navigation {
    .navigation {
      &--item {
        width: 100%;
        color: #9399a7;
      }

      &--badge {
        margin-left: 15px;
      }

      &--list {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &--link {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 70px;
        border-right: 2px solid transparent;
        padding: 0 15px;
        box-sizing: border-box;
        transition:
          color .2s ease-in-out,
          background-color .2s ease-in-out,
          border-color .2s ease-in-out;

        /deep/ .icon {
          margin-right: 15px;
          height: 24px;
          fill: $info;
          transition: fill .2s ease-in-out;
        }

        &:hover,
        &.active-link {
          border-color: $secondary;
          background-color: lighten($main, 7%);
          color: $secondary;

          /deep/ .icon {
            fill: $secondary;
          }
        }
      }
    }
  }
}
</style>

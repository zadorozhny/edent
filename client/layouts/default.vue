<template>
  <div class="layout">
    <div class="layout--header">
      <kit-transition-expand>
        <div v-if="warning && warning.show" class="layout--warning">
          <p>{{ warning.description }}</p>
        </div>
      </kit-transition-expand>
      <app-header @navigation="modals.navigation = true"/>
    </div>
    <div id="scroll" class="layout--content">
      <kit-modal-target/>
      <nuxt/>
    </div>
    <template v-if="$mq !== 'desktop'">
      <kit-menu v-if="modals.navigation" direction="left" name="menu" @close="modals.navigation = false">
        <navbar class="layout--navbar" @close="modals.navigation = false"/>
      </kit-menu>
    </template>
    <nuxt-link v-if="isAdmin" class="control control-left" to="/admin/products">
      Админ панель
    </nuxt-link>
    <kit-menu-target/>
    <kit-alert-target/>
    <kit-loader-target/>
  </div>
</template>

<script>
import AppHeader from '@/components/layouts/client/Header';
import Navbar from '@/components/layouts/client/Navbar';

export default {
  components: {
    AppHeader,
    Navbar
  },
  data() {
    return {
      modals: {
        navigation: false
      }
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters['auth/isAdmin'];
    },
    warning() {
      return this.$store.state.common.warning;
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  overflow: hidden;

  &--warning {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $warning;
    color: $light;
    padding: 10px;
    box-sizing: border-box;
  }

  &--content {
    position: relative;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }
}

.control {
  position: fixed;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 50px;
  background-color: $light;
  box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px 2px rgba(0, 0, 255, 0.15);
  }

  &-left {
    left: 10px;
  }
}
</style>

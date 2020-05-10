<template>
  <div class="layout">
    <app-header @navigation="modals.navigation = true"/>
    <div id="scroll" class="layout--content">
      <kit-modal-target/>
      <nuxt class="admin"/>
    </div>
    <template v-if="$mq !== 'desktop'">
      <kit-menu v-if="modals.navigation" direction="left" name="menu" @close="modals.navigation = false">
        <navbar class="layout--navbar" @close="modals.navigation = false"/>
      </kit-menu>
    </template>
    <kit-menu-target/>
    <kit-alert-target/>
    <kit-loader-target/>
  </div>
</template>

<script>
import AppHeader from '@/components/layouts/admin/Header';
import Navbar from '@/components/layouts/admin/Navbar';

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
  }
};
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  overflow: hidden;

  &--content {
    position: relative;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }
}
</style>

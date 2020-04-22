<template>
  <div class="layout">
    <app-header/>
    <div class="layout--content">
      <kit-modal-target/>
      <nuxt class="admin"/>
    </div>
    <kit-alert-target/>
    <kit-loader-target/>
  </div>
</template>

<script>
import AppHeader from '@/components/layouts/admin/Header';

export default {
  components: {
    AppHeader
  },
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

<template>
  <div class="layout">
    <app-header/>
    <nuxt/>
    <kit-alert-target/>
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
  min-width: 960px;
  overflow: auto;
}
</style>

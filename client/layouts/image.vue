<template>
  <div class="layout">
    <app-header/>
    <nuxt/>
  </div>
</template>

<script>
import AppHeader from '@/components/layouts/client/Header';

export default {
  components: {
    AppHeader
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  height: 100%;
}
</style>

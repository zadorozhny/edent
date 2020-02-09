<template>
  <v-app>
    <div class="layout">
      <app-header/>
      <nuxt/>
    </div>
  </v-app>
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
  grid-template-rows: auto 1fr;
}
</style>

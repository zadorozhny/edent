<template>
  <app-image-layout image="signin">
    <div class="signin">
      <div class="signin--content">
        <kit-input placeholder="Email"/>
        <kit-input placeholder="Пароль"/>
        <kit-button>
          Войти
        </kit-button>
      </div>
    </div>
  </app-image-layout>
</template>

<script>
import AppImageLayout from '@/components/layouts/common/Image';

export default {
  layout: 'fullscreen',
  components: {
    AppImageLayout
  },
  data: () => ({})
};
</script>

<style lang="scss" scoped>
.signin {
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100%;

  &--content {
    display: grid;
    grid-template-columns: 320px;
    grid-row-gap: 30px;
    text-align: center;
  }
}
</style>

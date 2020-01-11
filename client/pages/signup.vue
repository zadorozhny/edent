<template>
  <app-image-layout image="signup">
    <div class="signup">
      <div class="signup--content">
        <kit-input placeholder="Email"/>
        <kit-input placeholder="Телефон"/>
        <kit-input placeholder="Пароль"/>
        <kit-input placeholder="Повторить пароль"/>
        <kit-button>
          Зарегестрироваться
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
.signup {
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

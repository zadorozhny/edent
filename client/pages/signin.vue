<template>
  <app-image-layout image="signin">
    <div class="signin">
      <div class="signin--content">
        <kit-input v-model="credentials.email" placeholder="Email"/>
        <kit-input v-model="credentials.password" placeholder="Пароль" type="password"/>
        <kit-button @click="signin">
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
  data: () => ({
    credentials: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async signin() {
      await this.$store.dispatch('auth/signin', this.credentials);
    }
  }
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

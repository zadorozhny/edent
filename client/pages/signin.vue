<template>
  <div class="page container signin">
    <div class="signin--content">
      <kit-input v-model="credentials.email" type="email" placeholder="Email"/>
      <kit-input v-model="credentials.password" placeholder="Пароль" type="password"/>
      <kit-button @click="signin">
        Войти
      </kit-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    credentials: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async signin() {
      try {
        this.$nuxt.$loading.start();
        await this.$store.dispatch('auth/signin', this.credentials);
        this.$router.push('/admin/products');
      } catch (err) {
        this.$nuxt.$loading.finish();
        this.$alert.error(err.message);
      } finally {
        this.$nuxt.$loading.finish();
      }
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
    grid-template-columns: minmax(auto, 320px);
    grid-row-gap: 30px;
    text-align: center;
  }
}
</style>

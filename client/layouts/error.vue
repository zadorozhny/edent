<template>
  <div class="page error">
    <div v-if="error.statusCode === 404">
      <h1 class="error--title text_large">Страница не найдена 😔</h1>
      <img class="error--image" src="~/assets/images/no_found.svg">
    </div>
    <div v-else>
      <h1 class="error--title text_large">Проблемы с сервером 😔</h1>
      <img class="error--image" src="~/assets/images/error.svg">
    </div>
  </div>
</template>

<script>
export default {
  layout: 'fullscreen',
  props: {
    error: { type: Object, default: () => ({}) }
  }
};
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  &--title {
    margin-bottom: 40px;
    text-align: center;
    font-size: 30px;

    @media ($phablet) {
      font-size: 22px;
    }
  }

  &--image {
    max-width: 500px;
    width: 100%;
  }
}
</style>

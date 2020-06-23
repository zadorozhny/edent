<template functional>
  <div class="sure">
    <p class="sure--description">
      {{ props.title }}
    </p>
    <kit-button class="sure--button" @click="listeners.submit">
      Уверен
    </kit-button>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' }
  }
};
</script>

<style lang="scss" scoped>
.sure {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  max-width: 300px;
  border-radius: 5px;
  background: white;

  &--description {
    margin-bottom: 30px;
    text-align: center;
  }

  &--button {
    max-width: 250px;
  }

  @media ($tablet) {
    margin-right: 0;
    padding: 45px 10px;
    width: 100%;
    max-width: none;
    height: 100%;
    border-radius: 0;
    box-shadow: none;
  }
}
</style>

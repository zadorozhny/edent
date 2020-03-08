<template>
  <div class="sure">
    <p class="sure--description">
      {{ title }}
    </p>
    <kit-button @click="$emit('submit')">
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
}
</style>

<template>
  <section class="page container warning">
    <div class="warning--form">
      <div class="warning--switch">
        <kit-choice v-model="warning.show">
          <kit-switch>Показать баннер</kit-switch>
        </kit-choice>
      </div>
      <kit-textarea v-model="warning.description" class="warning--textarea"/>
      <kit-button @click="save">Сохранить</kit-button>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      warning: {
        show: false,
        description: ''
      }
    };
  },
  async asyncData({ app }) {
    const warning = await app.$api.warning.get();
    return {
      warning: {
        show: warning ? warning.show : false,
        description: warning ? warning.description : ''
      }
    };
  },
  methods: {
    async save() {
      try {
        this.$nuxt.$loading.start();
        await this.$api.warning.update(this.warning);
        this.$alert.success('Баннер обновлен');
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
.warning {
  &--form {
    max-width: 500px;
  }

  &--switch {
    margin-bottom: 20px;
    max-width: 200px;
  }

  &--textarea {
    margin-bottom: 20px;
  }
}
</style>

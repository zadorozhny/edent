<template>
  <section class="page container manufacturer">
    <div class="manufacturer--content">
      <kit-input
        v-model="manufacturer.name"
        :vuelidate="$v.manufacturer.name"
        placeholder="Название"
      />
    </div>
    <div class="manufacturer--controls">
      <kit-button :disabled="$v.manufacturer.$invalid" @click="create">
        Создать
      </kit-button>
    </div>
  </section>
</template>

<script>
import { details as schema } from '@/validations/manufacturer';

export default {
  layout: 'admin',
  data() {
    return {
      manufacturer: {
        name: ''
      }
    };
  },
  validations: {
    manufacturer: schema
  },
  methods: {
    async create() {
      try {
        this.$nuxt.$loading.start();
        await this.$api.manufacturers.create(this.manufacturer);
        this.$alert.success('Производитель создан');
        this.$router.push('/admin/manufacturers');
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
.manufacturer {
  &--content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;

    > * {
      width: 45%;
    }
  }

  &--controls {
    display: grid;
    grid-template-columns: 300px;
    justify-content: center;
    grid-area: controls;
  }
}
</style>

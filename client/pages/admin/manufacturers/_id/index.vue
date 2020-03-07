<template>
  <section class="page container manufacturer">
    <div class="manufacturer--content">
      <kit-input v-model="manufacturer.name" placeholder="Название"/>
    </div>
    <div class="manufacturer--controls" @click="update">
      <kit-button>
        Изменить
      </kit-button>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      manufacturer: {
        id: null,
        name: ''
      },
      categories: []
    };
  },
  async asyncData({ app, params }) {
    const manufacturer = await app.$api.manufacturers.get({ manufacturerId: params.id });
    return {
      manufacturer
    };
  },
  methods: {
    async update() {
      try {
        this.$nuxt.$loading.start();
        await this.$api.manufacturers.update({
          manufacturerId: this.manufacturer.id,
          ...this.manufacturer
        });
        this.$alert.success('Производитель обновлен');
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

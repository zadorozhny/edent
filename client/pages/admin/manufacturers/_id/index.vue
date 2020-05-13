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
      <kit-button class="manufacturer--button" :disabled="$v.manufacturer.$invalid" @click="update">
        Изменить
      </kit-button>
      <kit-button class="manufacturer--button" type="warning" @click="modals.sure = true">
        Удалить
      </kit-button>
    </div>
    <kit-modal
      v-if="modals.sure"
      name="sure"
      @close="modals.sure = false"
    >
      <app-sure :title="'Вы уверены, что хотетите удалить производителя?'" @submit="remove"/>
    </kit-modal>
  </section>
</template>

<script>
import { details as schema } from '@/validations/manufacturer';
import AppSure from '@/components/common/Sure';

export default {
  layout: 'admin',
  components: {
    AppSure
  },
  validations: {
    manufacturer: schema
  },
  data() {
    return {
      modals: {
        sure: false
      },
      manufacturer: {
        id: null,
        name: ''
      },
      categories: []
    };
  },
  async asyncData({ app, params }) {
    const manufacturer = params.manufacturer || await app.$api.manufacturers.get({ manufacturerId: params.id });
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
          name: this.manufacturer.name
        });
        this.$alert.success('Производитель обновлен');
        this.$router.push('/admin/manufacturers');
      } catch (err) {
        this.$nuxt.$loading.finish();
        this.$alert.error(err.message);
      } finally {
        this.$nuxt.$loading.finish();
      }
    },
    async remove() {
      try {
        this.$nuxt.$loading.start();
        await this.$api.manufacturers.remove({ manufacturerId: this.manufacturer.id });
        this.$alert.success('Производитель удален');
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
    display: grid;
    margin-bottom: 40px;
    grid-template-columns: 45%;

    @media ($phablet) {
      grid-template-columns: 1fr;
    }
  }

  &--controls {
    display: grid;
    grid-template-columns: 300px 300px;
    grid-column-gap: 30px;
    justify-content: center;

    @media ($phablet) {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 0;
    }
  }

  &--button {
    @media ($phablet) {
      border-radius: 0;
    }
  }
}
</style>

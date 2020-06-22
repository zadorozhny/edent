<template>
  <div class="page container contacts">
    <div class="contacts--content">
      <div class="contacts--info">
        <div class="contacts--info_wrapper">
          <h2 class="contacts--title text_title">Контакты</h2>
          <p v-for="(phone, index) in contacts" :key="index" class="contacts--phone">
            <img :src="icons[$utils.operator(phone)]">
            <a :href="`tel:${phone}`">{{ phone }}</a>
          </p>
        </div>
        <div class="contacts--info_wrapper">
          <h3 class="contacts--title text_title">Время работы</h3>
          <p class="contacts--work_time">
            <kit-icon :ripple="false" class="contacts--icon">date_range</kit-icon>
            понедельник - пятница
          </p>
          <p class="contacts--work_time">
            <kit-icon :ripple="false" class="contacts--icon">query_builder</kit-icon>
            08:00 - 18:00
          </p>
        </div>
      </div>
    </div>
    <div class="contacts--content">
      <div class="contacts--form">
        <h3 class="contacts--form_title text_title">Обратный звонок</h3>
        <kit-input
          v-model="phone"
          :vuelidate="$v.phone"
          type="tel"
          class="contacts--input"
          placeholder="Укажите номер телефона"
          mask="+{380} (00) 000-0000"
        />
        <kit-button :disabled="$v.phone.$invalid" @click="send">Заказать бесплатно</kit-button>
      </div>
    </div>
  </div>
</template>

<script>
import { create as schema } from '@/validations/call';
import { contacts } from '@/config';
import kyivstar from '@/assets/images/kyivstar.png';
import vodafone from '@/assets/images/vodafone.png';

export default {
  data: () => ({
    phone: ''
  }),
  validations: {
    phone: schema.phone
  },
  computed: {
    contacts() {
      return contacts;
    },
    icons() {
      return {
        kyivstar,
        vodafone
      };
    }
  },
  methods: {
    async send() {
      try {
        this.$nuxt.$loading.start();
        await this.$api.emails.callback({ phone: this.phone });
        this.$alert.success('Мы вам перезвоним!');
        this.phone = '';
        this.$v.$reset();
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
.contacts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 60px;
  padding: 30px 10px;

  @media ($phablet) {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  &--content {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ($phablet) {
      margin-bottom: 40px;
    }
  }

  &--info_wrapper {
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0;
    }

    @media ($phablet) {
      margin-bottom: 40px;
    }
  }

  &--form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    max-width: 400px;
    width: 100%;
    border-radius: 3px;
    box-sizing: border-box;
    box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);

    @media ($phablet) {
      max-width: 320px;
    }
  }

  &--form_title {
    margin-bottom: 20px;
  }

  &--title {
    margin-bottom: 25px;

    @media ($phablet) {
      text-align: center;
    }
  }

  &--phone {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-bottom: 5px;

    img {
      margin-right: 5px;
      width: 22px;
      height: 22px;
      pointer-events: none;
      user-select: none;
    }
  }

  &--work_time {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }

  &--icon {
    margin-right: 7px;
    width: 30px !important;
    height: 30px !important;
  }

  &--input {
    margin-bottom: 20px;
    width: 100%;
  }
}
</style>

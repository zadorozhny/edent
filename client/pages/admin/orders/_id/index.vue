<template>
  <section class="page container order">
    <div class="order--content">
      <kit-input placeholder="Телефон" mask="+{380} (00) 000-0000"/>
      <kit-select
        v-model="selectValue"
        :options="selectOptions"
        placeholder="Тип доставки"
      />
      <kit-input placeholder="Адресс"/>
      <kit-select
        v-model="selectValue"
        :options="selectOptions"
        placeholder="Статус"
      />
    </div>
    <div class="order--products">
      <kit-table class="table">
        <template #header>
          <div class="table--header">
            <div class="table--section">
              <span>Название</span>
            </div>
            <div class="table--section">
              <span>Цена</span>
            </div>
            <div class="table--section">
              <span>Количество</span>
            </div>
          </div>
        </template>
        <template #default="{ name, price, count }">
          <div class="table--item">
            <div class="table--section">
              <span>{{ name }}</span>
            </div>
            <div class="table--section">
              <span>{{ price }}</span>
            </div>
            <div class="table--section">
              <span class="table--control">-</span>
              <span>{{ count }}</span>
              <span class="table--control">+</span>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="table--footer">
            <span class="table--title">
              Сумма
            </span>
            <span class="table--total">
              ₴4367
            </span>
          </div>
        </template>
      </kit-table>
    </div>
    <div class="order--controls">
      <kit-button>
        Создать
      </kit-button>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      image: null,
      selectValue: null,
      selectOptions: [1, 2, 3]
    };
  }
};
</script>

<style lang="scss" scoped>
.product {
  display: grid;
  grid-template-columns: 50% calc(50% - 20px);
  grid-template-areas:
    "image content"
    "description description"
    "controls controls";
  grid-template-rows: 360px auto;
  grid-column-gap: 20px;
  grid-row-gap: 40px;

  &--image {
    grid-area: image;
  }

  &--content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    grid-area: content;
  }

  &--description {
    grid-area: description;
  }

  &--controls {
    display: grid;
    grid-template-columns: 300px;
    justify-content: center;
    grid-area: controls;
  }
}

.textarea {
  padding: 14px 10px;
  width: 100%;
  height: 200px;
  border: solid 1px #cfdbdf;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  resize: none;
  outline: none;
}
</style>

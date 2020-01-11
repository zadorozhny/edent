<template>
  <section class="page container product">
    <div class="product--image">
      <kit-image-uploader v-model="image"/>
    </div>
    <div class="product--content">
      <kit-input placeholder="Название"/>
      <kit-select
        v-model="selectValue"
        :options="selectOptions"
        placeholder="Категория"
      />
      <kit-select
        v-model="selectValue"
        :options="selectOptions"
        placeholder="Производитель"
      />
      <kit-input placeholder="Цена"/>
    </div>
    <div class="product--description">
      <textarea class="textarea" placeholder="Описание"/>
    </div>
    <div class="product--controls">
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

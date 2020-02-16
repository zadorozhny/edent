<template>
  <section class="page container manufacturers">
    <div class="cover">
      <div class="manufacturers--header">
        <kit-input placeholder="Поиск" type="search"/>
        <kit-button>Создать</kit-button>
      </div>
      <kit-table class="table" :items="items">
        <template #header>
          <div class="table--header">
            <div class="table--section">
              <span>Название</span>
            </div>
          </div>
        </template>
        <template #default="{ name }">
          <div class="table--item">
            <div class="table--section">
              <span>{{ name }}</span>
            </div>
          </div>
        </template>
      </kit-table>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      items: []
    };
  },
  async asyncData({ app }) {
    const items = await app.$api.manufacturers.getList();
    return {
      items
    };
  }
};
</script>

<style lang="scss" scoped>
.manufacturers {
  &--header {
    display: grid;
    grid-template-columns: 360px 200px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
}

.cover {
  width: 100%;
}

.table {
  &--header {
    display: grid;
    grid-template-columns: 1fr;
  }

  &--section {
    display: flex;
    align-items: center;
    padding: 15px 10px;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &--item {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>

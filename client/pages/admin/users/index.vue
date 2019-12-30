<template>
  <section class="page container users">
    <div class="cover">
      <div class="users--header">
        <kit-input placeholder="Поиск" type="search"/>
        <kit-button>Создать</kit-button>
      </div>
      <kit-table class="table">
        <template #header>
          <div class="table--header">
            <div class="table--section">
              <span>Имя</span>
            </div>
            <div class="table--section">
              <span>Email</span>
            </div>
            <div class="table--section">
              <span>Телефон</span>
            </div>
          </div>
        </template>
        <template #default="{ name, email, phone }">
          <div class="table--item">
            <div class="table--section">
              <span>{{ name }}</span>
            </div>
            <div class="table--section">
              <span>{{ email }}</span>
            </div>
            <div class="table--section">
              <span>{{ phone }}</span>
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
      option: 'ex',
      value: [1, 200]
    };
  }
};
</script>

<style lang="scss" scoped>
.users {
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
    grid-template-columns: minmax(0, 1fr) 1fr 140px;
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
    grid-template-columns: minmax(0, 1fr) 1fr 140px;
  }
}
</style>

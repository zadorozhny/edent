<template>
  <section class="page container users">
    <div class="cover">
      <div class="users--header">
        <kit-input placeholder="Поиск" type="search"/>
      </div>
      <kit-table class="table" :items="items">
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
      items: []
    };
  },
  async asyncData({ app }) {
    const items = await app.$api.users.getList();
    return {
      items
    };
  }
};
</script>

<style lang="scss" scoped>
.users {
  &--header {
    display: grid;
    grid-template-columns: 360px;
    margin-bottom: 30px;
  }
}

.cover {
  width: 100%;
}

.table {
  &--header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 1fr 160px;
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
    grid-template-columns: minmax(0, 1fr) 1fr 160px;
  }
}
</style>

<template>
  <div class="layout">
    <nav class="navigation">
      <ul class="navigation--list">
        <li>Главная</li>
        <li>Продукты</li>
        <li>Категории</li>
      </ul>
    </nav>
    <section class="container">
      <nuxt />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
}

.navigation {
  padding: 10px 20px;
  box-shadow: 1px 2px 5px rgba(0,0,0,0.3);
}

.container {
  padding: 10px 20px;
  overflow: auto;
}
</style>

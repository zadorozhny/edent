<template>
  <div class="layout">
    <nav class="navigation">
      <h1 class="navigation--logo">Logo</h1>
      <ul class="navigation--list">
        <kit-tabs class="a" :tabs="tabs" :active.sync="tab">
          <template #tab="{ label, link }">
            <nuxt-link tag="li" :to="link" class="navigation--item">
              <span>{{ label }}</span>
            </nuxt-link>
          </template>
        </kit-tabs>
      </ul>
      <div class="navigation--avatar ripple">
        <span class="navigation--letters">АЗ</span>
      </div>
    </nav>
    <section class="container">
      <nuxt/>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: 'home',
    tabs: [
      { key: 'home', link: '/', label: 'Главная' },
      { key: 'products', link: '/products', label: 'Товары' },
      { key: 'info', link: '/info', label: 'Доставка и Связь' }
    ]
  })
};
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  min-height: 62px;
  box-shadow: 0px 1px 4px 0 rgba(0,0,0,0.3);

  &--list {
    display: flex;
    align-items: center;
    height: 62px;
  }

  &--item {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 10px;
    box-sizing: border-box;
    cursor: pointer;

    &.active {
      &::after {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 3px;
        background: #283b56;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &--avatar {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background: #283b56;
    transition: .25s ease-out;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;

    &:hover {
      &::after {
        display: block;
        position: absolute;
        top: -3px;
        left: -3px;
        content: '';
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: #f0f0f0;
        z-index: -1;
      }
    }
  }

  &--letters {
    font-size: 16px;
  }
}
.a {
  height: 100%;
}

.container {
  padding: 10px 20px;
  overflow: auto;
}
</style>

<template>
  <div class="pagination">
    <span class="pagination--control">
      <kit-icon :ripple="false">
        keyboard_arrow_left
      </kit-icon>
    </span>
    <span class="pagination--number">3</span>
    <span class="pagination--control">
      <kit-icon :ripple="false">
        keyboard_arrow_right
      </kit-icon>
    </span>
  </div>
</template>

<script>

export default {
  name: 'KitPagination',
  data: () => ({})
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;

  &--number {
    font-size: 16px;
  }

  &--control {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    font-size: 20px;
    border-radius: 5px;
    box-shadow: 0 0 4px 3px rgba(0, 0, 255, 0.1);
    background: #f7f9f8;
    cursor: pointer;
    transition: .25s ease-out;
    user-select: none;

    @media ($mobile) {
      width: 30px;
      height: 30px;
    }

    &:hover {
      box-shadow: 0 0 8px 3px rgba(0, 0, 255, 0.2);
    }

    &:first-child {
      margin-right: 10px;
    }

    &:last-child {
      margin-left: 10px;
    }
  }
}
</style>

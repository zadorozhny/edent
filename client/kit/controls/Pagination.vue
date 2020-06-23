<template functional>
  <div class="pagination">
    <span class="pagination--control">
      <kit-icon
        :class="{ 'icon-disable': !props.offset }"
        :ripple="false"
        @click="props.offset && listeners.change(-1)"
      >
        keyboard_arrow_left
      </kit-icon>
    </span>
    <span class="pagination--number text_medium">{{ Math.ceil(props.offset / props.limit) + 1 }}</span>
    <span class="pagination--control text_large">
      <kit-icon
        :class="{ 'icon-disable': props.offset + props.limit >= props.count }"
        :ripple="false"
        @click="props.offset + props.limit < props.count && listeners.change(1)"
      >
        keyboard_arrow_right
      </kit-icon>
    </span>
  </div>
</template>

<script>

export default {
  name: 'KitPagination',
  props: {
    count: { type: Number, default: 0 },
    offset: { type: Number, default: 0 },
    limit: { type: Number, default: 0 }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;

  &--control {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 5px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 255, 0.1);
    background: #f7f9f8;
    cursor: pointer;
    transition: .25s ease-out;
    user-select: none;

    @media ($mobile) {
      width: 30px;
      height: 30px;
    }

    &:hover {
      box-shadow: 0 0 4px 2px rgba(0, 0, 255, 0.15);
    }

    &:first-child {
      margin-right: 10px;
    }

    &:last-child {
      margin-left: 10px;
    }
  }
}

.icon-disable {
  opacity: 0.4
}
</style>

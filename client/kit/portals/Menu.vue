<template>
  <portal v-bind="$attrs" :name="name" to="menu">
    <div class="modal" @keyup.esc="$emit('close')">
      <div :class="['modal--content', direction]" @mousedown.self="$emit('close')">
        <slot/>
      </div>
    </div>
  </portal>
</template>

<script>
import { Portal } from 'portal-vue';

export default {
  name: 'KitMenu',
  components: {
    Portal
  },
  inheritAttrs: false,
  props: {
    name: { type: String, default: null },
    direction: {
      type: String,
      default: 'left',
      validator: size => ['left', 'right'].includes(size)
    },
  },
  watch: {
    '$route.path': {
      handler() {
        this.$emit('close');
      }
    }
  },
  mounted() {
    const [element] = document.getElementsByTagName('body');
    element.classList.add('stop_scrolling');
  },
  destroyed() {
    const [element] = document.getElementsByTagName('body');
    element.classList.remove('stop_scrolling');
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(black, .7);
  backdrop-filter: blur(5px);
  overflow: hidden;
  z-index: 11;

  &--content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    margin: 0 auto;
    box-sizing: border-box;
    cursor: pointer;

    /deep/ &.right .menu  {
      right: 0;
    }

    /deep/ &.left .menu  {
      left: 0;
    }
  }
}
</style>

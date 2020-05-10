<template>
  <portal v-bind="$attrs" :name="name" :order="order" to="modals">
    <div :key="name" class="modal" @keyup.esc="$emit('close')">
      <div class="modal--content" @mousedown.self="$emit('close')">
        <kit-icon
          v-if="$mq !== 'desktop'"
          class="modal--close"
          size="compact"
          @click="$emit('close')"
        >
          clear
        </kit-icon>
        <slot/>
      </div>
    </div>
  </portal>
</template>

<script>
import { Portal } from 'portal-vue';

export default {
  name: 'KitModal',
  components: {
    Portal
  },
  inheritAttrs: false,
  props: {
    name: { type: String, default: null },
    order: { type: Number, default: Infinity }
  },
  watch: {
    '$route.path': {
      handler() {
        this.$emit('close');
      }
    }
  },
  mounted() {
    const element = document.getElementById('scroll');
    element.classList.add('stop_scrolling');
  },
  destroyed() {
    const element = document.getElementById('scroll');
    element.classList.remove('stop_scrolling');
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(black, .7);
  backdrop-filter: blur(5px);
  overflow: hidden;
  z-index: 5;

  @media ($tablet) {
    background-color: unset;
    backdrop-filter: unset;
  }

  &--content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    margin: 0 auto;
    box-sizing: border-box;
    cursor: pointer;

    @media ($tablet) {
      padding: 0;
    }
  }

  &--wrapper {
    position: relative;
  }

  &--close {
    position: absolute;
    top: 5px;
    right: 10px;
    background: $fill;
    z-index: 2;
  }
}
</style>

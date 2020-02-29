<template>
  <portal v-bind="$attrs" :name="name" :order="order" to="modals">
    <div :key="name" class="modal" @keyup.esc="$emit('close')">
      <div class="modal--content" @mousedown.self="$emit('close')">
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
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
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
}
</style>

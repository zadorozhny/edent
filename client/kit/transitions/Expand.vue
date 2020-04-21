<template>
  <transition
    name="expand"
    @enter="enter"
    @enter-cancelled="clear"
    @after-enter="clear"
    @leave="leave"
    @after-leave="clear"
    @leave-cancelled="clear"
  >
    <slot/>
  </transition>
</template>

<script>
export default {
  name: 'KitTransitionExpand',
  methods: {
    enter(el) {
      const { width } = window.getComputedStyle(el);
      el.style.visibility = 'hidden';
      el.style.position = 'absolute';
      el.style.height = 'auto';
      el.style.width = width;

      const { height } = window.getComputedStyle(el);

      el.style.display = null;
      el.style.visibility = null;
      el.style.position = null;
      el.style.height = 0;
      el.style.width = null;

      // eslint-disable-next-line no-unused-expressions
      window.getComputedStyle(el).height;

      window.requestAnimationFrame(() => {
        el.style.height = height;
      });
    },
    leave(el) {
      const { height } = window.getComputedStyle(el);
      el.style.height = height;

      // eslint-disable-next-line no-unused-expressions
      window.getComputedStyle(el).height;

      window.requestAnimationFrame(() => {
        el.style.height = 0;
      });
    },
    clear(el) {
      el.style.height = null;
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.expand-enter-active, .expand-leave-active {
  transition: height .2s ease-out;
  overflow: hidden;
  user-select: none;
}

.expand-enter, .expand-leave-to {
  height: 0;
}
</style>

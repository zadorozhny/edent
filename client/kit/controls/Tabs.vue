<template>
  <div class="tabs">
    <template v-for="tab in tabs">
      <div ref="tabs" :key="tab.key" class="tabs--tab text_medium" @click="proxy = tab.key">
        <slot v-bind="tab" name="tab"/>
      </div>
    </template>
    <div ref="slider" class="tabs--slider"/>
  </div>
</template>

<script>
export default {
  name: 'KitTabs',
  props: {
    active: { type: String, required: true },
    tabs: { type: Array, default: () => [] }
  },
  computed: {
    index() {
      return this.tabs.findIndex(tab => tab.key === this.active);
    },
    proxy: {
      get() {
        return this.active;
      },
      set(active) {
        this.$emit('update:active', active);
      }
    }
  },
  mounted() {
    this.$watch('index', {
      immediate: true,
      handler: () => this.$nextTick(() => {
        if (this.index >= 0) {
          this.$refs.slider.style.width = `${this.$refs.tabs[this.index].offsetWidth}px`;
          this.$refs.slider.style.left = `${this.$refs.tabs[this.index].offsetLeft}px`;
        }
      })
    });
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  position: relative;
  display: flex;

  &--tab {
    flex-grow: 1;
    padding: 15px 0;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }

  &--slider {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: $main;
    transition: width .2s ease-out,
      left .2s ease-out;
  }
}
</style>

<template>
  <portal-target
    name="menu"
    transition="kit-transition-menu"
    slim
  />
</template>

<script>
import { PortalTarget, Wormhole } from 'portal-vue';

export default {
  name: 'KitMenuTarget',
  components: {
    PortalTarget
  },
  data: () => ({
    wormhole: Wormhole
  }),
  computed: {
    opened() {
      return this.wormhole.hasContentFor('menu');
    }
  },
  watch: {
    opened(opened) {
      this.$emit('change', opened);
    }
  },
  destroyed() {
    this.wormhole.close({ to: 'menu', from: 'all' }, true);
  }
};
</script>

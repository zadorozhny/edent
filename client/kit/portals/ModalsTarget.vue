<template>
  <portal-target
    name="modals"
    transition="kit-transition-modal"
    multiple
    class="modal_target"
  />
</template>

<script>
import { PortalTarget, Wormhole } from 'portal-vue';

export default {
  name: 'KitModalTarget',
  components: {
    PortalTarget
  },
  computed: {
    opened() {
      return Wormhole.hasContentFor('modals');
    }
  },
  watch: {
    opened(opened) {
      this.$emit('change', opened);
    }
  },
  destroyed() {
    Wormhole.close({ to: 'modals', from: 'all' }, true);
  }
};
</script>

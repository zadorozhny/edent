<template>
  <portal-target
    name="alerts"
    transition="kit-transition-alert"
    multiple
    class="alert_target"
    @hook:destroyed="wormhole.close({ to: 'alerts', from: 'all' }, true)"
  />
</template>

<script>
import { PortalTarget, Wormhole } from 'portal-vue';

export default {
  name: 'KitAlertTarget',
  components: {
    PortalTarget
  },
  data: () => ({
    wormhole: Wormhole
  })
};
</script>

<style lang="scss" scoped>
.alert_target {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  z-index: 11;
  pointer-events: none;
  overflow: hidden;

  &::v-deep > *:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>

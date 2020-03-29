<template>
  <portal-target
    name="loader"
    transition="kit-transition-loader"
    class="loader_target"
    @hook:destroyed="wormhole.close({ to: 'loader', from: 'loader-portal' })"
  />
</template>

<script>
import { PortalTarget, Wormhole } from 'portal-vue';

export default {
  name: 'KitLoaderTarget',
  components: {
    PortalTarget
  },
  data: () => ({
    wormhole: Wormhole
  })
};
</script>

<style lang="scss" scoped>
.loader_target {
  position: absolute;
  top: 13px;
  left: 50%;
  transform: translate(-50%, 0);
  fill: $dark;

  @media ($mobile) {
    top: 7px;
  }
}
</style>

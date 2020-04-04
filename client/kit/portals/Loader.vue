<!-- eslint-disable max-len -->
<template>
  <div class="loader">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="40px"
      height="40px"
      viewBox="0 0 50 50"
      style="enable-background:new 0 0 50 50;"
      xml:space="preserve"
    >
      <path
        fill="#000"
        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
</template>

<script>
import { Wormhole } from 'portal-vue';

export default {
  name: 'KitLoader'
};

export const LoaderWormhole = {
  data: () => ({
    wormhole: Wormhole,
    timeout: null,
    time: null
  }),
  methods: {
    start() {
      if (!this.timeout) {
        this.time = Date.now();
        this.wormhole.open({
          to: 'loader',
          from: 'loader-portal',
          passengers: [this.$createElement('kit-loader', {
            on: { close: () => this.close() }
          })]
        });
      }
    },
    finish() {
      const difference = Date.now() - this.time;
      this.timeout = setTimeout(() => {
        this.wormhole.close({ to: 'loader', from: 'loader-portal' });
        this.timeout = null;
      }, difference > 300 ? 0 : 300 - difference);
    }
  }
};
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: $light;
  box-shadow: 0 0 4px 2px rgba(0, 0, 255, 0.15);
  border-radius: 50%;
  z-index: 100;

  svg {
    width: 26px;
    width: 26px;
  }
}
</style>

<template>
  <div :class="['alert', type]">
    <kit-icon :class="['alert--icon', `alert--icon-${type}`]" size="compact">
      {{ icon }}
    </kit-icon>
    <div class="alert--message">{{ message }}</div>
    <kit-icon class="alert--close" size="compact" @click="$emit('close')">
      close
    </kit-icon>
  </div>
</template>

<script>
import { Wormhole } from 'portal-vue';
import Icon from '@/kit/views/Icon';

export default {
  name: 'KitAlert',
  components: {
    [Icon.name]: Icon
  },
  props: {
    message: { type: String, required: true },
    type: {
      type: String,
      default: 'info',
      validator: type => ['info', 'success', 'error'].includes(type)
    }
  },
  computed: {
    icon() {
      switch (this.type) {
      case 'info':
        return 'warning';
      case 'error':
        return 'error_outline';
      case 'success':
        return 'done_all';
      default:
        return 'done_all';
      }
    }
  }
};

export const AlertWormhole = {
  data: () => ({
    wormhole: Wormhole,
    portals: [],
    pid: 1
  }),
  watch: {
    portals(portals) {
      if (portals.length > 3) {
        const key = portals.shift();
        this.wormhole.close({ to: 'alerts', from: key });
      }
    }
  },
  methods: {
    open(type, arg) {
      const { timeout = 3000, key = String(this.pid++), message } = typeof arg === 'object' ? arg
        : typeof arg === 'string' ? { message: arg }
        : {};
      this.wormhole.open({
        to: 'alerts',
        from: key,
        passengers: [this.$createElement('kit-alert', {
          props: { type, message },
          on: { close: () => this.close(key) },
          key
        })]
      });
      this.portals.push(key);
      setTimeout(() => this.close(key), timeout);
      return key;
    },
    close(key) {
      const index = this.portals.indexOf(key);
      if (index >= 0) {
        this.portals.splice(index, 1);
        this.wormhole.close({ to: 'alerts', from: key });
      }
    },
    info(arg) {
      return this.open('info', arg);
    },
    success(arg) {
      return this.open('success', arg);
    },
    error(arg) {
      return this.open('error', arg);
    }
  }
};
</script>


<style lang="scss" scoped>
.alert {
  display: inline-grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  grid-gap: 10px;
  align-items: center;
  min-width: 300px;
  max-width: 100%;
  height: 48px;
  padding: 8px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: $light;
  box-shadow: 1px 1px 5px rgba(#4A4A4A, .2);
  box-sizing: border-box;
  pointer-events: auto;

  @media ($mobile) {
    max-width: 300px;
  }

  &--message {
    @include clamp;
  }

  &--icon {
    height: 28px;

    .info & {
      color: $warning;
    }

    .error & {
      color: $danger;
    }

    .success & {
      color: $success
    }
  }

  &--close {
    height: 20px;
    color: $main;
    cursor: pointer;
  }
}
</style>

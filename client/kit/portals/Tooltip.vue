<template>
  <div class="tooltip" @mouseover="focus = true" @mouseout="focus = false">
    <div ref="reference" class="tooltip--reference">
      <slot/>
    </div>
    <client-only>
      <mounting-portal mount-to="#popups_target" name="tooltip" append>
        <div v-show="visible" ref="popup" :class="['popup', type]">
          <slot name="content">{{ content }}</slot>
          <div ref="arrow" class="popup--arrow"/>
        </div>
      </mounting-portal>
    </client-only>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';
import { MountingPortal } from 'portal-vue';

export default {
  name: 'KitTooltip',
  components: {
    MountingPortal
  },
  props: {
    content: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    type: {
      type: String,
      default: 'primary',
      validator: type => ['primary', 'warning', 'disabled'].includes(type)
    }
  },
  data: () => ({
    focus: false
  }),
  computed: {
    visible() {
      return !this.disabled && this.focus && (this.content || this.$slots.content);
    }
  },
  watch: {
    visible() {
      this.$nextTick(this.popper ? this.popper.scheduleUpdate : this.create);
    }
  },
  destroyed() {
    if (this.popper) {
      this.popper.destroy();
    }
  },
  methods: {
    create() {
      createPopper(this.$refs.reference, this.$refs.popup, {
        placement: 'top',
        modifiers: [
          {
            name: 'arrow',
            options: {
              element: this.$refs.arrow
            }
          },
          {
            name: 'offset',
            options: {
              offset: [0, 10]
            }
          },
          {
            name: 'preventOverflow',
            options: {
              padding: 10,
              rootBoundary: 'viewport'
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tooltip {
  &--reference {
    height: inherit;
    width: inherit;
    > * {
      width: inherit;
      height: inherit;
    }
  }
}

.popup {
  position: absolute;
  max-width: 250px;
  padding: 5px;
  border-radius: 2px;
  background-color: $light;
  box-shadow: 0 2px 12px 0 rgba(black, .1);
  z-index: 100;

  &.warning {
    background-color: $warning;
    color: $light;
  }

  &.disabled {
    background-color: $disabled;
    color: $info;
  }

  &--arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-width: 6px;
    border-style: solid;
    filter: drop-shadow(0 2px 12px rgba(black, .03));
  }

  &[x-placement^=top] > &--arrow {
    bottom: -6px;
    border-top-color: $light;
    border-bottom-width: 0;
  }

  &[x-placement^=top].warning > &--arrow {
    border-top-color: $warning;
  }

  &[x-placement^=top].disabled > &--arrow {
    border-top-color: $disabled;
  }

  &[x-placement^=bottom] > &--arrow {
    top: -6px;
    border-bottom-color: $light;
    border-top-width: 0;
  }

  &[x-placement^=bottom].warning > &--arrow {
    border-bottom-color: $warning;
  }

  &[x-placement^=bottom].disabled > &--arrow {
    border-bottom-color: $disabled;
  }
}
</style>

<template>
  <div v-show="show" :class="['slider', { disabled }]">
    <div
      ref="slider"
      class="slider--wrapper"
      @mousedown="start"
      @touchstart="start"
    >
      <div ref="background" class="slider--background"/>
      <div ref="dragger-to" class="slider--dragger">
        <slot name="dragger" :value="value">
          <div class="slider--dragger_container">
            <span class="slider--value">{{ value }}</span>
          </div>
        </slot>
      </div>
      <slot name="breakpoints">
        <ul class="slider--points">
          <li
            v-for="breakpoint in breakpoints"
            :key="breakpoint"
            :class="['slider--point', { active: active(breakpoint) }]"
          />
        </ul>
      </slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'KitSlider',
  props: {
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    disabled: { type: Boolean, default: false }
  },
  data: () => ({
    show: false,
    scope: {
      min: 0,
      max: 100
    },
    width: null,
    offset: null
  }),
  computed: {
    proxy: {
      get() {
        return this.value;
      },
      set(value) {
        const to = this.round(value);
        if (to !== this.proxy) {
          this.$emit('input', to);
        }
      }
    },
    breakpoints() {
      return [this.min, this.max];
    },
    gap() {
      return 100 / (this.max - this.min);
    }
  },
  watch: {
    proxy(curr, prev) {
      if (curr !== prev) {
        this.drag();
      }
    }
  },
  mounted() {
    this.drag();
    this.show = true;
  },
  methods: {
    round(value) {
      return !Number.isNaN(Number(value)) ? Number(value.toFixed(0)) : value;
    },
    point(value) {
      return this.gap * (value - this.min);
    },
    active(point) {
      return point <= this.proxy;
    },
    start(event) {
      this.offset = this.$refs.slider.getBoundingClientRect().left;
      this.width = this.$refs.slider.clientWidth;

      this.calculate(event);
      window.addEventListener('mousemove', this.calculate);

      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', this.calculate);
      });
    },
    calculate(event) {
      const clientX = event.clientX ? event.clientX : event.changedTouches[0].clientX;
      let position = 100 / this.width * (clientX - this.offset);
      if (position > this.scope.max) {
        position = this.scope.max;
      } else if (position < this.scope.min) {
        position = this.scope.min;
      }
      if (position >= this.scope.min && position <= this.scope.max) {
        this.proxy = (this.max - this.min) / 100 * position + this.min;
      }
    },
    drag() {
      this.$refs.background.style.width = `${this.point(this.proxy)}%`;
      this.$refs['dragger-to'].style.left = `${this.point(this.proxy)}%`;
    }
  }
};

</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  box-sizing: border-box;
  user-select: none;

  &.disabled {
    pointer-events: none;
  }

  &--wrapper {
    position: relative;
    height: 3px;
    margin: 10px;
    border-radius: 50px;
    background: $fill;
    cursor: pointer;
  }

  &--background {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    border-radius: 50px;
    background: $main;
    cursor: pointer;

    .slider.disabled & {
      background: $disabled;
    }
  }

  &--dragger {
    position: absolute;
    top: 50%;
    left: 0;
    min-width: 16px;
    min-height: 16px;
    text-align: center;
    font-size: 10px;
    white-space: nowrap;
    color: $light;
    transform: translate(-8px, -50%);
    border-radius: 50px;
    background: $main;
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
    cursor: grab;
    z-index: 2;

    .slider.disabled & {
      background: $disabled;
    }
  }

  &--dragger_container {
    position: relative;
  }

  &--value {
    position: absolute;
    bottom: -30px;
    right: 50%;
    transform: translate(50%, 0);
    color: $text;
  }

  &--points {
    position: absolute;
    top: 50%;
    left: -8px;
    display: flex;
    justify-content: space-between;
    width: calc(100% + 16px);
    transform: translate(0, -50%);
  }

  &--point {
    position: relative;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: $fill;

    .slider.disabled & {
      background: $disabled;
    }

    &.active {
      background: $main;

      .slider.disabled & {
        background: $disabled;
      }
    }
  }
}
</style>

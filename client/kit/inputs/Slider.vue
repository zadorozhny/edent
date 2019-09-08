<template>
  <div v-show="show" :class="['slider', { disabled }]">
    <div
      ref="slider"
      class="slider--wrapper"
      @mousedown="start"
      @touchstart="start"
    >
      <div ref="background" class="slider--background"/>
      <div v-if="range" ref="dragger-from" class="slider--dragger">
        <slot name="dragger" :value="value[0]">{{ value }}</slot>
      </div>
      <div ref="dragger-to" class="slider--dragger">
        <slot name="dragger" :value="range ? value[1] : value">{{ value }}</slot>
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
    <div class="slider--labels">
      <slot name="labels"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'KitSlider',
  props: {
    value: { type: [Number, Array, String], default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    steps: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false }
  },
  data: () => ({
    show: false,
    scope: {
      min: 0,
      max: 100
    },
    direction: 'to',
    width: null,
    offset: null
  }),
  computed: {
    proxy: {
      get() {
        return this.value;
      },
      set(value) {
        if (this.range) {
          const from = this.round(value[0]);
          const to = this.round(value[1]);
          if (from !== this.proxy[0] || to !== this.proxy[1]) {
            this.$emit('input', [from, to]);
          }
        } else {
          const to = this.round(value);
          if (to !== this.proxy) {
            this.$emit('input', to);
          }
        }
      }
    },
    breakpoints() {
      if (this.steps.length) {
        return [this.steps[0], this.steps[this.steps.length - 1]];
      } else {
        return [this.min, this.max];
      }
    },
    range() {
      return Array.isArray(this.proxy);
    },
    gap() {
      return this.steps.length ? 100 / (this.steps.length - 1) : 100 / (this.max - this.min);
    }
  },
  watch: {
    proxy(curr, prev) {
      if (this.range && (curr[0] !== prev[0] || curr[1] !== prev[1])) {
        this.drag();
      } else if (!this.range && curr !== prev) {
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
      return !Number.isNaN(Number(value)) ? Number(value.toFixed(1)) : value;
    },
    active(point) {
      if (this.range) {
        const [from, to] = this.proxy;
        if (this.steps.length) {
          const indexes = {
            point: this.steps.indexOf(point),
            from: this.steps.indexOf(from),
            to: this.steps.indexOf(to)
          };
          return indexes.point >= indexes.from && indexes.point <= indexes.to;
        } else {
          return point >= from && point <= to;
        }
      } else if (this.steps.length) {
        return this.steps.indexOf(point) <= this.steps.indexOf(this.proxy);
      } else {
        return point <= this.proxy;
      }
    },
    point(value) {
      return this.steps.length ? this.gap * this.steps.indexOf(value) : this.gap * (value - this.min);
    },
    start(event) {
      this.offset = this.$refs.slider.getBoundingClientRect().left;
      this.width = this.$refs.slider.clientWidth;
      if (this.range) {
        this.create(event);
      }
      this.calculate(event);
      window.addEventListener('mousemove', this.calculate);
      window.addEventListener('touchmove', this.calculate);

      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', this.calculate);
        window.removeEventListener('touchmove', this.calculate);
      });
      window.addEventListener('touchend', () => {
        window.removeEventListener('mousemove', this.calculate);
        window.removeEventListener('touchmove', this.calculate);
      });
    },
    create(event) {
      const position = 100 / this.width * (event.clientX - this.offset);
      const [from, to] = this.proxy;
      if (
        Math.abs(this.point(from) - position) < Math.abs(this.point(to) - position)
        || (this.point(from) === this.point(to) && this.point(from) - position > 0)
      ) {
        this.scope.min = 0;
        this.scope.max = this.point(to);
        this.direction = 'from';
      } else {
        this.scope.min = this.point(from);
        this.scope.max = 100;
        this.direction = 'to';
      }
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
        if (this.steps.length) {
          const closest = this.steps.reduce(
            (prev, curr) => Math.abs(this.point(curr) - position) < Math.abs(this.point(prev) - position) ? curr : prev
          );
          if (this.range) {
            const [from, to] = this.proxy;
            this.proxy = this.direction === 'from' ? [closest, to] : [from, closest];
          } else {
            this.proxy = closest;
          }
        } else if (this.range) {
          const [from, to] = this.proxy;
          const value = (this.max - this.min) / 100 * position + this.min;
          this.proxy = this.direction === 'from' ? [value, to] : [from, value];
        } else {
          this.proxy = (this.max - this.min) / 100 * position + this.min;
        }
      }
    },
    drag() {
      if (this.range) {
        const from = this.point(this.proxy[0]);
        const to = this.point(this.proxy[1]);
        this.$refs.background.style.left = `${from}%`;
        this.$refs.background.style.width = `${to - from}%`;
        this.$refs['dragger-from'].style.left = `${from}%`;
        this.$refs['dragger-to'].style.left = `${to}%`;
      } else {
        this.$refs.background.style.width = `${this.point(this.proxy)}%`;
        this.$refs['dragger-to'].style.left = `${this.point(this.proxy)}%`;
      }
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
    background: #bcc8ca;
    cursor: pointer;
  }

  &--background {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    border-radius: 50px;
    background: #283b56;
    cursor: pointer;

    .slider.disabled & {
      background: #bcc8ca;
    }
  }

  &--dragger {
    position: absolute;
    top: 50%;
    left: 0;
    padding: 6px;
    min-width: 18px;
    text-align: center;
    font-size: 10px;
    white-space: nowrap;
    color: white;
    transform: translate(-15px, -50%);
    border-radius: 50px;
    background: #283b56;
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
    cursor: grab;
    z-index: 2;

    .slider.disabled & {
      background: #bcc8ca;
    }
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
    background: #bcc8ca;

    .slider.disabled & {
      background: #bcc8ca;
    }

    &.active {
      background: #283b56;

      .slider.disabled & {
        background: #bcc8ca;
      }
    }
  }

  &--labels {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(0, auto));

    &:not(:empty) {
      margin-top: 20px;
    }

    > * {
      justify-self: center;
    }

    > *:first-child {
      justify-self: start;
    }

    > *:last-child {
      justify-self: end;
    }
  }
}
</style>

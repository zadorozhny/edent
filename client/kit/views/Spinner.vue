<template functional>
  <svg :class="['spinner', size]" viewBox="0 0 66 66">
    <circle
      class="path"
      fill="none"
      stroke-width="6"
      stroke-linecap="round"
      cx="33"
      cy="33"
      r="30"
    />
  </svg>
</template>

<script>

export default {
  name: 'KitSpinner',
  props: {
    size: {
      type: String,
      default: 'regular',
      validator: size => ['compact', 'regular', 'large'].includes(size)
    },
  }
};
</script>

<style lang="scss" scoped>
$offset: 187;
$duration: 1.4s;

.spinner {
  animation: rotator $duration linear infinite;

  &.compact {
    width: 40px;
    height: 40px;
  }

  &.regular {
    width: 50px;
    height: 50px;
  }

  &.large {
    width: 60px;
    height: 60px;
  }
}

@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
}

.path {
  stroke: $main;
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation:
    dash $duration ease-in-out infinite,
    colors ($duration*4) ease-in-out infinite;
}

@keyframes colors {
  0% { opacity: 1; }
  25% { opacity: .8; }
  50% { opacity: .6; }
  75% { opacity: .4; }
  100% { opacity: .2; }
}

@keyframes dash {
 0% { stroke-dashoffset: $offset; }
 50% {
   stroke-dashoffset: $offset / 4;
   transform: rotate(135deg);
 }
 100% {
   stroke-dashoffset: $offset;
   transform: rotate(450deg);
 }
}
</style>

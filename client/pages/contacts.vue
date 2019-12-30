<template>
  <app-image-layout image="contact_us"/>
</template>

<script>
import AppImageLayout from '@/components/layouts/common/Image';

export default {
  layout: 'fullscreen',
  components: {
    AppImageLayout
  },
  data: () => ({})
};
</script>

<style lang="scss" scoped>
.contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  margin-left: calc(50% - 1250px / 2);

  &--picture {
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>

<template>
  <div class="label_group">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'KitLabelGroup'
};
</script>

<style lang="scss" scoped>
.label_group {
  display: flex;

  /deep/ .label {
    width: 100%;
    text-align: center;
  }

  /deep/ .choice {
    width: 100%;
  }

  > .label::v-deep,
  > .choice::v-deep > .label > .label--content {
    padding-right: 5px;
    padding-left: 5px;
  }

  > .label::v-deep:not(:first-child):not(:last-child),
  > .choice::v-deep:not(:first-child):not(:last-child) > .label {
    border-radius: 0;
  }

  > .label::v-deep:first-child:not(:last-child),
  > .choice::v-deep:first-child:not(:last-child) > .label {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > .label::v-deep:last-child:not(:first-child),
  > .choice::v-deep:last-child:not(:first-child) > .label {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  > .label::v-deep:not(:last-child),
  > .choice::v-deep:not(:last-child) > .label {
    border-right: none;
  }
}
</style>

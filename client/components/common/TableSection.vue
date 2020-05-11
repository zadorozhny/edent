<template>
  <div class="section">
    <span>
      <slot/>
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  align-items: center;
  padding: 15px 10px;

  @media ($mobile) {
    padding: 10px 5px;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

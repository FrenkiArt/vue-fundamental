<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss">
.btn {
  padding: 5px 10px;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid green;
}
</style>
